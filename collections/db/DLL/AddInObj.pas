unit AddInObj;

interface

uses  { Какие библиотеки используем }
  ComServ, ComObj, ActiveX, SysUtils, Windows, AddInLib, uComPort, Classes, crcpos;

     const c_AddinName = 'vk_trscale'; //Имя внешней компоненты

     //Количество свойств
     const c_PropCount = 7;

     //Идентификаторы свойств
     type TProperties = (
       propErrorMsg,
       propEOL,
       propBaudRate,
       propByteSize,
       propParity,
       propStopBits,
       propScalesProt
     );

     //Имена свойств, видимые из 1С
     //Порядок соблюдайте точно такой же, что и в TProperties
    const c_PropNames: Array[0..c_PropCount-1, 0..1] of ShortString =
    (
      ('ErrorMsg','Ошибка'),
      ('EOL','КонецСтроки'),
      ('BaudRate','СкоростьПередачи'),
      ('ByteSize','РазмерБайта'),
      ('Parity','Четность'),
      ('StopBits','СтоповыеБиты'),
      ('PropScalesProt','ПротоколВесов')

    );

    //Количество методов
     const c_MethCount = 4;
    //Идентификаторы методов.
    type TMethods = (
       methOpenPort,
       methClosePort,
       methWriteString,
       methKbHook
       );

    //Имена методов, видимые из 1С
     //Порядок соблюдайте точно такой же, что и в TMethods
    const c_MethNames: Array[0..c_MethCount-1,0..1] of ShortString =
    (
    ('OpenPort','ОткрытьПорт'),
    ('ClosePort','ЗакрытьПорт'),
    ('WriteString','ЗаписатьСтроку'),
    ('KbHook','ПерехватКлавиатуры')
    );

const
{Нажмите Ctrl-Shift-G чтобы сгенерировать новый уникальный идентификатор GUID}
     CLSID_AddInObject : TGUID = '{E1D77485-B7C7-43D7-9CDA-ECBB4B369B07}';

type

  AddInObject = class(TComObject, IDispatch, IInitDone, ILanguageExtender)

  public
    MyThread: TThread;

    g_ErrorMsg: String;
    g_cp: T_ComPort;
    g_isOpen: Boolean;


    i1cv7: IDispatch;
    iStatus: IStatusLine;
    iExtWindows: IExtWndsSupport;
    iError: IErrorLog;
    iEvent : IAsyncEvent;
  protected
    { These two methods is convenient way to access function
      parameters from SAFEARRAY vector of variants }
    function GetNParam(var pArray : PSafeArray; lIndex: Integer ): OleVariant;
    procedure PutNParam(var pArray: PSafeArray; lIndex: Integer; var varPut: OleVariant);

    { IInitDone implementation }
    function Init(pConnection: IDispatch): HResult; stdcall;
    function Done: HResult; stdcall;
    function GetInfo(var pInfo: PSafeArray): HResult; stdcall;

    { ILanguageExtender implementation }
    function RegisterExtensionAs(var bstrExtensionName: WideString): HResult; stdcall;
    function GetNProps(var plProps: Integer): HResult; stdcall;
    function FindProp(const bstrPropName: WideString; var plPropNum: Integer): HResult; stdcall;
    function GetPropName(lPropNum, lPropAlias: Integer; var pbstrPropName: WideString): HResult; stdcall;
    function GetPropVal(lPropNum: Integer; var pvarPropVal: OleVariant): HResult; stdcall;
    function SetPropVal(lPropNum: Integer; var varPropVal: OleVariant): HResult; stdcall;
    function IsPropReadable(lPropNum: Integer; var pboolPropRead: Integer): HResult; stdcall;
    function IsPropWritable(lPropNum: Integer; var pboolPropWrite: Integer): HResult; stdcall;
    function GetNMethods(var plMethods: Integer): HResult; stdcall;
    function FindMethod(const bstrMethodName: WideString; var plMethodNum: Integer): HResult; stdcall;
    function GetMethodName(lMethodNum, lMethodAlias: Integer; var pbstrMethodName: WideString): HResult; stdcall;
    function GetNParams(lMethodNum: Integer; var plParams: Integer): HResult; stdcall;
    function GetParamDefValue(lMethodNum, lParamNum: Integer; var pvarParamDefValue: OleVariant): HResult; stdcall;
    function HasRetVal(lMethodNum: Integer; var pboolRetValue: Integer): HResult; stdcall;
    function CallAsProc(lMethodNum: Integer; var paParams: PSafeArray): HResult; stdcall;
    function CallAsFunc(lMethodNum: Integer; var pvarRetValue: OleVariant; var paParams: PSafeArray): HResult; stdcall;

    { IDispatch }
    function GetIDsOfNames(const IID: TGUID; Names: Pointer;
      NameCount, LocaleID: Integer; DispIDs: Pointer): HResult; virtual; stdcall;
    function GetTypeInfo(Index, LocaleID: Integer; out TypeInfo): HResult; virtual; stdcall;
    function GetTypeInfoCount(out Count: Integer): HResult; virtual; stdcall;
    function Invoke(DispID: Integer; const IID: TGUID; LocaleID: Integer;
      Flags: Word; var Params; VarResult, ExcepInfo, ArgErr: Pointer): HResult; virtual; stdcall;
    { Hook }

    { IStatusLine }
    function SetStatusLine(const bstrSource: WideString): HResult; safecall;
    function ResetStatusLine(): HResult; safecall;

    procedure ShowErrorLog(fMessage:WideString);
  end;

type
  TMyThread = class(TThread) //Новый класс
  private
    MyObject: AddInObject;

  protected
    constructor Create(prm_Obj:AddInObject);
    procedure Execute; override;
  end;


implementation

var
    g_kb_str: String;
    g_kb_CriticalSection: _RTL_CRITICAL_SECTION;
    g_kb_counter: Integer;
    g_sz_barcodes: TStringList;
    g_kb_CurrentHook: HHook; //contains the handle of the currently installed hook
    g_kb_HookInstalled: boolean; //true if a hook is installed




//=======================  General functions  ================================
///////////////////////////////////////////////////////////////////////
function AddInObject.GetNParam(var pArray : PSafeArray; lIndex: Integer ): OleVariant;
var
  varGet : OleVariant;
begin
  SafeArrayGetElement(pArray,lIndex,varGet);
  GetNParam := varGet;
end;

///////////////////////////////////////////////////////////////////////
procedure AddInObject.PutNParam(var pArray: PSafeArray; lIndex: Integer; var varPut: OleVariant);
begin
  SafeArrayPutElement(pArray,lIndex,varPut);
end;



//======================= IInitDone interface ================================
///////////////////////////////////////////////////////////////////////
function AddInObject.Init(pConnection: IDispatch): HResult; stdcall;
//var  wnd: HWND;
begin
  i1cv7:=pConnection;

  iError:=nil;
  pConnection.QueryInterface(IID_IErrorLog,iError);

  iStatus:=nil;
  pConnection.QueryInterface(IID_IStatusLine,iStatus);

  iEvent := nil;
  pConnection.QueryInterface(IID_IAsyncEvent,iEvent);
  iEvent.SetEventBufferDepth(300); //глубина буфера событий


//  iExtWindows:=nil;
//  pConnection.QueryInterface(IID_IExtWndsSupport,iExtWindows);


//  iExtWindows.GetAppMainFrame(wnd);
//  Application.Handle := wnd;



  g_cp:= T_ComPort.Create;

  MyThread:=nil;
  g_isOpen:=False;
  g_kb_str:='';
  g_sz_barcodes:=TStringList.Create;

  Init := S_OK;
end;

///////////////////////////////////////////////////////////////////////
function AddInObject.Done: HResult; stdcall;
begin
  If ( iStatus <> nil ) then
    iStatus._Release();

  If ( iExtWindows <> nil ) then
    iExtWindows._Release();

  If ( iError <> nil ) then
    iError._Release();

  if (iEvent <> nil) then
    iEvent._Release();

  if (MyThread <> nil) then begin
        MyThread.Terminate; //завершаем поток
        MyThread.WaitFor; //ждем, когда поток закончит свое выполнение
        g_cp.ClosePort();
        if Assigned(MyThread) then FreeAndNil(MyThread);
  end;

  if Assigned(g_cp) then FreeAndNil(g_cp);
  if Assigned(g_sz_barcodes) then FreeAndNil(g_sz_barcodes);

  if g_kb_HookInstalled then begin
    UnhookWindowsHookEx(g_kb_CurrentHook);
    g_kb_HookInstalled:=false;
  end;




  Done := S_OK;
end;
///////////////////////////////////////////////////////////////////////
function AddInObject.GetInfo(var pInfo: PSafeArray{(OleVariant)}): HResult; stdcall;
var  varInfo : OleVariant;
begin
  varInfo := '2000';
  PutNParam(pInfo,0,varInfo);

  GetInfo := S_OK;
end;

//======================= IStatusLine Interface ==============================
///////////////////////////////////////////////////////////////////////
function AddInObject.SetStatusLine(const bstrSource: WideString): HResult; safecall;
begin
  SetStatusLine:=S_OK;
end;
///////////////////////////////////////////////////////////////////////
function AddInObject.ResetStatusLine(): HResult; safecall;
begin
  //ResetStatusLine: = S_OK;
end;

//======================= ILanguageExtender Interface ========================
///////////////////////////////////////////////////////////////////////
function AddInObject.RegisterExtensionAs(var bstrExtensionName: WideString): HResult; stdcall;
begin
  bstrExtensionName := c_AddinName;
  RegisterExtensionAs := S_OK;
end;
///////////////////////////////////////////////////////////////////////
function AddInObject.GetNProps(var plProps: Integer): HResult; stdcall;
begin
     plProps := Integer(c_PropCount);
     GetNProps := S_OK;
end;
///////////////////////////////////////////////////////////////////////
function AddInObject.FindProp(const bstrPropName: WideString; var plPropNum: Integer): HResult; stdcall;
var
  NewPropName: WideString;
  i: Integer;
begin
     plPropNum := -1;

     NewPropName:=bstrPropName;

     for i:=0 to c_PropCount-1 do begin
       if (NewPropName=c_PropNames[i,0]) or (NewPropName=c_PropNames[i,1]) then begin
         plPropNum:=i;
         break;
       end;
     end;

     if (plPropNum = -1) then
       begin
         FindProp := S_FALSE;
         Exit;
       end;

     FindProp := S_OK;
end;
///////////////////////////////////////////////////////////////////////
function AddInObject.GetPropName(lPropNum, lPropAlias: Integer; var pbstrPropName: WideString): HResult; stdcall;
begin
     pbstrPropName := '';
     if (lPropAlias<>0) and (lPropAlias<>1) then begin
            GetPropName := S_FALSE;
            Exit;
     end;
     if (lPropNum<0) or (lPropNum>=c_PropCount) then begin
            GetPropName := S_FALSE;
            Exit;
     end;

     pbstrPropName := c_PropNames[lPropNum, lPropAlias];

     GetPropName := S_OK;
end;
///////////////////////////////////////////////////////////////////////
function AddInObject.GetPropVal(lPropNum: Integer; var pvarPropVal: OleVariant): HResult; stdcall;
//Здесь 1С читает значения свойств
begin
     VarClear(pvarPropVal);
     try
       case TProperties(lPropNum) of
            propErrorMsg:
              begin
                   pvarPropVal := g_ErrorMsg;
              end;
            propEOL:
              begin
                   pvarPropVal := g_cp.p_EOL;
              end;
            propBaudRate:
              begin
                   pvarPropVal := g_cp.p_BaudRate;
              end;
            propByteSize:
              begin
                   pvarPropVal := g_cp.p_ByteSize;
              end;
            propParity:
              begin
                   pvarPropVal := g_cp.p_Parity;
              end;
            propStopBits:
              begin
                   pvarPropVal := g_cp.p_StopBits;
              end;
            propScalesProt:
              begin
                   pvarPropVal := g_cp.p_ScalesProt;
              end;

            else
              GetPropVal := S_FALSE;
              Exit;
       end;
      except

           on E:Exception do begin
             g_ErrorMsg:=E.Message;
             ShowErrorLog(g_ErrorMsg);
           end;

      end; //try
     GetPropVal := S_OK;
end;
///////////////////////////////////////////////////////////////////////
function AddInObject.SetPropVal(lPropNum: Integer; var varPropVal: OleVariant): HResult; stdcall;
//Здесь 1С устанавливает значения свойств
begin
     try
       case TProperties(lPropNum) of
            propEOL:
              begin
                   g_cp.p_EOL:=varPropVal;
              end;
            propBaudRate:
              begin
                   g_cp.p_BaudRate:=varPropVal;
              end;
            propByteSize:
              begin
                   g_cp.p_ByteSize:=varPropVal;
              end;
            propParity:
              begin
                   g_cp.p_Parity:=varPropVal;
              end;
            propStopBits:
              begin
                   g_cp.p_StopBits:=varPropVal;
              end;
            propScalesProt:
              begin
                   g_cp.p_ScalesProt:=varPropVal;
              end;

            else
              SetPropVal := S_FALSE;
              Exit;
       end;
      except
           on E:Exception do begin
             g_ErrorMsg:=E.Message;
             ShowErrorLog(g_ErrorMsg);
           end;
      end; //try
  SetPropVal := S_OK;
end;
///////////////////////////////////////////////////////////////////////
function AddInObject.IsPropReadable(lPropNum: Integer; var pboolPropRead: Integer): HResult; stdcall;
{Здесь 1С узнает, можно ли читать свойства}
begin

     case TProperties(lPropNum) of
          propErrorMsg: pboolPropRead := 1;{1=можно читать свойство, 0=нет}
     else
            IsPropReadable := S_FALSE;
            Exit;
     end;

     IsPropReadable := S_OK;

end;
///////////////////////////////////////////////////////////////////////
function AddInObject.IsPropWritable(lPropNum: Integer; var pboolPropWrite: Integer): HResult; stdcall;
//Здесь 1С узнает, можно ли изменять свойство
begin
     case TProperties(lPropNum) of
          propErrorMsg: pboolPropWrite := 0;{1=можно записывать свойство, 0=нет}
          else
            IsPropWritable := S_FALSE;
            Exit;
     end;

     IsPropWritable := S_OK;
end;
///////////////////////////////////////////////////////////////////////
function AddInObject.GetNMethods(var plMethods: Integer): HResult; stdcall;
begin
     plMethods := c_MethCount;
     GetNMethods := S_OK;
end;
///////////////////////////////////////////////////////////////////////
function AddInObject.FindMethod(const bstrMethodName: WideString; var plMethodNum: Integer): HResult; stdcall;
var NewMethodName: WideString;
var i:Integer;
begin
  NewMethodName := bstrMethodName;

     plMethodNum := -1;

     for i:=0 to c_MethCount-1 do begin
       if (NewMethodName=c_MethNames[i,0]) or (NewMethodName=c_MethNames[i,1]) then begin
         plMethodNum := i;
         break;
       end;
     end;

     if (plMethodNum = -1) then
       begin
         FindMethod := S_FALSE;
         Exit;
       end;

     FindMethod := S_OK;

end;
///////////////////////////////////////////////////////////////////////
function AddInObject.GetMethodName(lMethodNum, lMethodAlias: Integer; var pbstrMethodName: WideString): HResult; stdcall;
begin

     pbstrMethodName := '';
     if (lMethodAlias<>0) and (lMethodAlias<>1) then begin
            Result := S_FALSE;
            Exit;
     end;
     if (lMethodNum<0) or (lMethodNum>=c_MethCount) then begin
            Result := S_FALSE;
            Exit;
     end;

     pbstrMethodName := c_MethNames[lMethodNum, lMethodAlias];

     GetMethodName := S_OK;

end;

///////////////////////////////////////////////////////////////////////
function AddInObject.GetNParams(lMethodNum: Integer; var plParams: Integer): HResult; stdcall;
//Здесь 1С узнает количество параметров у методов
begin

     plParams := 0;

     case TMethods(lMethodNum) of

          methOpenPort: plParams := 1;{1 параметр}
          methWriteString: plParams := 1;{1 параметр}
          methClosePort: plParams := 0;{нет параметров}
          methKbHook: plParams := 1;{1 параметр}
          else
            begin
               GetNParams := S_FALSE;
               Exit;
            end;
     end;

     GetNParams := S_OK;

end;
///////////////////////////////////////////////////////////////////////
function AddInObject.GetParamDefValue(lMethodNum, lParamNum: Integer; var pvarParamDefValue: OleVariant): HResult; stdcall;
begin
  { Ther is no default value for any parameter }
  VarClear(pvarParamDefValue);
  GetParamDefValue := S_OK;
end;
///////////////////////////////////////////////////////////////////////
function AddInObject.HasRetVal(lMethodNum: Integer; var pboolRetValue: Integer): HResult; stdcall;
//Здесь 1С узнает, какие методы работают как функции
begin
     pboolRetValue := 1; //Все методы возвращают значение
     HasRetVal := S_OK;
end;



///////////////////////////////////////////////////////////////////////
function AddInObject.CallAsProc(lMethodNum: Integer; var paParams: PSafeArray{(OleVariant)}): HResult; stdcall;
//Здесь 1С выполняет код процедур
begin
    CallAsProc := S_FALSE;
end;



///////////////////////////////////////////////////////////////////////
Function GetMs(dt: TDateTime): Integer;
var hh, mm, ss, ms: Word;
begin
  DecodeTime(dt, hh, mm, ss, ms);
  Result:=ms + ss*1000+ mm*1000*60+ hh*1000*60*60;
end;

         {
KeyboardHook
------------
This is the function that we will set windows to call whenever a key is pressed
returns 1 - i.e. let windows call the next keybaord hook (if there is one).
Note the STDCALL! This is required because of the way memory is managed when passing arguments
from one function to another. Windows does not normally use the same method as delphi, so the
stdcall option tells the compiler to use the windows method.
With a keyboard hook, code specifies if keyboard message is being processed, (read peekmessage
and getmessage in the sdk. wParam is the key code and lParam contains info on the key.}

///////////////////////////////////////////////////////////////////////
function KeyBoardHook(code: integer; wParam: word; lParam: longword): longword; stdcall;
var old_kb_counter, razn: Integer;
begin
    if code<0 then begin  //if code is <0 your keyboard hook should always run CallNextHookEx instantly and
       KeyBoardHook:=CallNextHookEx(g_kb_CurrentHook,code,wParam,lparam); //then return the value from it.
       Exit;
    end;

    if (lParam and $F0000000)=0 then begin //нажатие, но не отпускание и не автоповтор
       //MessageBox(0, pchar(IntToHex(lParam, 8)), pchar(IntToStr(WParam)), 0);
       EnterCriticalSection(g_kb_CriticalSection);
       try
          old_kb_counter:=g_kb_counter;
          g_kb_counter:= GetMS(Now);
          razn:=g_kb_counter-old_kb_counter;

          //Очищаем строку, если время больше 1 сек.
          if (razn>300) or (razn<0) then g_kb_str:='';

         if WParam=13 then begin
            if g_kb_str<>'' then begin
              g_sz_barcodes.Add(g_kb_str);
              g_kb_str:='';
            end;
         end else begin
            g_kb_str:=g_kb_str+chr(WParam);
         end;
         //MessageBox(0, pchar(s), '', 0);
       except
       end;
       LeaveCriticalSection(g_kb_CriticalSection);
       //

    end;
    CallNextHookEx(g_kb_CurrentHook,code,wParam,lparam);  //call the next hook proc if there is one
    Result:=0; //if KeyBoardHook returns a non-zero value, the window that should get
                     //the keyboard message doesnt get it.
end;









///////////////////////////////////////////////////////////////////////
function AddInObject.CallAsFunc(lMethodNum: Integer; var pvarRetValue: OleVariant; var paParams: PSafeArray): HResult; stdcall;
{Здесь 1С выполняет код функций}
var PortName: String;
var str,stro: String;
var isHook: Integer;
var i:Integer;

begin
  pvarRetValue:=0;
  try
    case TMethods(lMethodNum) of

      methOpenPort: begin
          PortName:=trim(GetNParam(paParams,0));//Имя COM-порта

          if g_isOpen then
            Raise Exception.Create('Порт уже открыт');

          g_cp.OpenPort(PortName);

           //MessageBox(0, Pchar('порт открыт'+inttostr(g_cp.p_parity )), '*debug',0);

          if MyThread<>Nil then
            Raise Exception.Create('Поток уже инициализирован.');

            //MessageBox(0, pchar('создание потока'+PortName), '*debug',0);
            MyThread := TMyThread.Create(Self);
          g_isOpen:=True;
      end; // methOpenPort

      methClosePort: begin
          if g_isOpen=False then
            Raise Exception.Create('Порт не был открыт');
        MyThread.Terminate; //завершаем поток
        MyThread.WaitFor; //ждем, когда поток закончит свое выполнение
        MyThread.Destroy;
        MyThread:=nil;
        g_cp.ClosePort();
        g_isOpen:=False;
      end; //methClosePort

      methWriteString: begin
          if g_isOpen=False then
          Raise Exception.Create('Порт не был открыт');

          str:=GetNParam(paParams,0);//Строка для записи в COM-порт
          stro:='';
          If g_cp.p_ScalesProt=18 then
             // преобразование
             For i:=1 to length(str) do
                  Stro:=Stro+Chr(Ord(str[i])-Ord('0'));
          g_cp.WriteString(stro);
          sleep(300);
          //MessageBox(0, pchar(str), '-10', 0);
      end; // methWriteString

      methKbHook: begin
        isHook:=GetNParam(paParams,0);//1=включить перехват, 0=выключить
        if isHook=1 then begin
          g_kb_CurrentHook:=setwindowshookex(WH_KEYBOARD,@KeyBoardHook,0,GetCurrentThreadID()); //install hook
          if g_kb_CurrentHook<>0  then g_kb_HookInstalled:=true else g_kb_HookInstalled:=false; //return true if it worked
        end else begin
          if g_kb_HookInstalled then begin
            UnhookWindowsHookEx(g_kb_CurrentHook);
            g_kb_HookInstalled:=false;
          end;


        end
      end


      else begin
               CallAsFunc := S_FALSE;
               Exit;
               end;
          end; //case

      except

           on E:Exception do begin
             g_ErrorMsg:=E.Message;
             ShowErrorLog(g_ErrorMsg);
           end;

      end; //try
         CallAsFunc := S_OK;
end;
///////////////////////////////////////////////////////////////////////
function AddInObject.GetIDsOfNames(const IID: TGUID; Names: Pointer;
  NameCount, LocaleID: Integer; DispIDs: Pointer): HResult;
begin
  Result := E_NOTIMPL;
end;
///////////////////////////////////////////////////////////////////////
function AddInObject.GetTypeInfo(Index, LocaleID: Integer;
  out TypeInfo): HResult;
begin
  Result := E_NOTIMPL;
end;

///////////////////////////////////////////////////////////////////////
function AddInObject.GetTypeInfoCount(out Count: Integer): HResult;
begin
  Result := E_NOTIMPL;
end;

///////////////////////////////////////////////////////////////////////
function AddInObject.Invoke(DispID: Integer; const IID: TGUID; LocaleID: Integer;
  Flags: Word; var Params; VarResult, ExcepInfo, ArgErr: Pointer): HResult;
begin
  Result := E_NOTIMPL;
end;

///////////////////////////////////////////////////////////////////////
procedure AddInObject.ShowErrorLog(fMessage:WideString);
var
  ErrInfo: PExcepInfo;
begin
  If Trim(fMessage) = '' then Exit;
  New(ErrInfo);
  ErrInfo^.bstrSource := c_AddinName;
  ErrInfo^.bstrDescription := fMessage;
  ErrInfo^.wCode:=1006;
  ErrInfo^.sCode:=E_FAIL; //генерация исключения в 1С
  iError.AddError(nil, ErrInfo);
end;

///////////////////////////////////////////////////////////////////////
//Процедура потока
procedure TMyThread.Execute;
var str,stro,evt: String;
var i,rl:integer;
var cc,dp,by:Byte;

begin
  try
     repeat

       //str:=trim(str);

        str:='';
        stro:='';
         // ожидание события

        rl:=MyObject.g_cp.p_ScalesProt;

        str:=MyObject.g_cp.ReadString(rl);
        If length(Str)<rl then
            str:=str+MyObject.g_cp.ReadString(rl-length(str));
        if length(str)=rl then begin
           Case rl of
           18: begin
               For i:=1 to 6 do
                  begin
                    stro:=chr(ord(str[i])+Ord('0'))+stro;
                    if i=3 then
                        stro:='.'+stro;
                  end;
               evt:= 'weight1';
               end;
           10: begin
               // <N,И6,И5,И4,И3,И2,И1,СС> Протокол 10
                 stro:=Copy(str,3,6);
                 CC:=ord(str[9]);
               //положення крапки с1с0
	       dp:=CC mod 4;
                // біт заспокоєння с2
               by:=  (CC mod 8) shr 2;
	        //індикація "0"   с3
	        //Светится0=Цел((СС % 16)/8);
	        //індикація "Т"   с4
	        //СветитсяТ=Цел((СС % 32)/16);
	        //Сообщить(СС);
	        //Сообщить(СветитсяТ);
	        //знак ваги 1= <0 с5
	        //Если Цел((СС % 64)/32)=0 тогда
	        //ЗнакВесов=1
        	//Иначе
	        //  ЗнакВесов=-1
	        //КонецЕсли;
                insert('.',stro,6-dp);
                evt:= 'weight'+inttostr(by);
               end;
           7: begin
               // <,N,И2,И1,И0,СС >  	протокол 7

               end;
           end;
           MyObject.iEvent.ExternalEvent(c_AddinName, evt, Stro);
        end;


         EnterCriticalSection(g_kb_CriticalSection);

         try
           if g_sz_barcodes.Count>0 then begin
             MyObject.iEvent.ExternalEvent(c_AddinName, 'button', g_sz_barcodes.Strings[0]);
             g_sz_barcodes.Delete(0);
             g_kb_str:='';
           end;
         except
         end;

       LeaveCriticalSection(g_kb_CriticalSection);


       sleep(300);
     until terminated;
  except
     on E:Exception do begin
       MyObject.ShowErrorLog('Ошибка чтения из COM-порта: '+E.Message);
     end;
  end;

end;

///////////////////////////////////////////////////////////////////////
constructor TMyThread.Create(prm_Obj:AddInObject);
begin
    inherited Create(False);
    MyObject:=prm_Obj;
end;



///////////////////////////////////////////////////////////////////////

initialization
  ComServer.SetServerName('AddIn');
  TComObjectFactory.Create(ComServer,AddInObject,CLSID_AddInObject,
    c_AddinName,'V7 AddIn 2.0',ciMultiInstance);

  InitializeCriticalSection(g_kb_CriticalSection);

finalization

  DeleteCriticalSection(g_kb_CriticalSection);


end.
