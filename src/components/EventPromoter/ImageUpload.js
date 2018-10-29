import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';


class ImageUpload extends Component {
  state = { image: null }

  onDrop = (images) => {
    const image = images[0]
    this.setState({ image });
    var data = new FormData();
    data.append('image', image);
    const { eventUUID } = this.props;
    axios.post(`/api/v1/events/${eventUUID}/upload_teaser_image/`, data);
    // handle error, "Error uploading the image, pls try again"
  }

  render() {
    return (
        <Dropzone
          accept="image/*"
          multiple={false}
          maxSize={725000}
          onDrop={this.onDrop}
        >
          { this.state.image ?
            <img height="190" src={this.state.image.preview} alt="upload preview" role="presentation" />:
            <p>Try dropping some files here, or click to select files to upload.</p>
          }
        </Dropzone>
    );
  }
}

export default ImageUpload;
