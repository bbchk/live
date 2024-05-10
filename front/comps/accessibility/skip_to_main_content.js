import s from './skip_to_main_content.module.scss';

const SkipToMainContent = ({ mainContentId }) => {
  return (
    <a href={`#${mainContentId}`} className={`${s.skip}`}>
      Перейти до основного контенту
    </a>
  );
};

export default SkipToMainContent;
