import React, {useState, useEffect} from 'react';
import { Modal } from '../Context/Modal';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { deleteRoute } from '../../store/route'
import './RouteDeleteModal.css';

function RouteDeleteModal({routeId}) {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const userId = useParams()

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteRoute(routeId));
    setShowModal(false);
    history.push(`/users/${userId}/routes`);
  }
  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(false);
  }

return (
    <div>
        <button type="submit" onClick={() => setShowModal(true)} className="routeDeleteModalBtn">Delete</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <div className="routeDeleteModal">
                <div className="form">
                  <p>Are you sure you want to delete this route?</p>
                  <button type="submit" onClick={handleDelete} className="routeDeleteConfirmBtn">Okay</button>
                  <button type="submit" onClick={handleCancel} className="routeDeleteConfirmBtn">Cancel</button>
                </div>
              </div>
            </Modal>
        )}
    </div>
  );
}

export default RouteDeleteModal;
