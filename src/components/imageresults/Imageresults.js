import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

class ImageResults extends Component {
  state = {
    open: false,
    currentImg: ''
  };

  handleOpen = img => {
    this.setState({ open: true, currentImg: img });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <ImageList cols={3}>
          {images.map(img => (
            <ImageListItem key={img.id}>
              <img src={img.largeImageURL} alt={img.tags} loading="lazy" />
              <ImageListItemBar
                title={img.tags}
                subtitle={<span>by: <strong>{img.user}</strong></span>}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    onClick={() => this.handleOpen(img.largeImageURL)}
                  >
                    <ZoomInIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      );
    } else {
      imageListContent = null;
    }

    return (
      <div>
        {imageListContent}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <Box sx={{ overflow: 'hidden' }}>
            <img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
          </Box>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageResults;
