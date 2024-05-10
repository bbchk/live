import { Modal } from 'react-bootstrap';
import s from './delete_account_modal.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice';
const { DELETE_ACCOUNT_MODAL } = GLOBAL_COMPS;

import { balsamiqSans } from 'pages/_app';
import useTabTrap from 'comps/accessibility/hooks/useTabbingTrap.js';

const DeleteAccountModal = () => {
  const dispatch = useDispatch();
  const { deleteAccountModalOpen } = useSelector((state) => state.modals);

  const handleDelete = async (e) => {
    e.preventDefault();
    //todo implement delete account logic
  };

  const toggleModal = () => dispatch(toggle(DELETE_ACCOUNT_MODAL));

  useTabTrap(deleteAccountModalOpen, 'deleteAccountModal');

  return (
    <Modal
      id="deleteAccountModal"
      show={deleteAccountModalOpen}
      onHide={toggleModal}
      centered
      className={`${s.modal} ${balsamiqSans.className}`}
    >
      <Modal.Header closeButton={true} className="modal_header_title_center">
        <h3>Видалити акаунт ?</h3>
      </Modal.Header>
      <Modal.Body className={`${s.modal_body}`}>
        <menu className={`${s.button_group}`}>
          <li>
            <button className="button_primary" onClick={toggleModal}>
              Скасувати
            </button>
          </li>
          <li>
            <button
              className="button_danger"
              onClick={(e) => {
                toggleModal();
                handleDelete(e);
              }}
            >
              Видалити акаунт
            </button>
          </li>
        </menu>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteAccountModal;
