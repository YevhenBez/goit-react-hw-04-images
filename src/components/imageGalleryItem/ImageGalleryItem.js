import Modal from '../modal/Modal';
import React, { useState } from 'react';
import css from './css/imageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ item }) => {
  const [shownModal, setShownModal] = useState(false);

  const onModal = () => {
    setShownModal(true);
  };

  const closeModal = () => {
    setShownModal(false);
  };

  const { webformatURL, tags } = item;

  return (
    <li className={css.imageGalleryItem}>
      <img
        onClick={onModal}
        className={css.imageGalleryItemPicture}
        src={webformatURL}
        alt={tags}
      />
      {shownModal && <Modal onClose={closeModal} image={item} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;

// class ImageGalleryItem extends React.Component {
//   state = {
//     shownModal: false,
//   };
//   onModal = () => {
//     this.setState(({ shownModal }) => ({ shownModal: !shownModal }));
//   };
//   render() {
//     const { item } = this.props;
//     const { webformatURL, tags } = item;
//     return (
//       <li className={css.imageGalleryItem}>
//         <img
//           onClick={this.onModal}
//           className={css.imageGalleryItemPicture}
//           src={webformatURL}
//           alt={tags}
//         />
//         {this.state.shownModal && <Modal onClose={this.onModal} image={item} />}
//       </li>
//     );
//   }
// }

// ImageGalleryItem.propTypes = {
//   item: PropTypes.shape({
//     webformatURL: PropTypes.string.isRequired,
//     tags: PropTypes.string.isRequired,
//     }),};

// export default ImageGalleryItem;
