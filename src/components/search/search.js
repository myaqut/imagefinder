import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import ImageResults from '../imageresults/Imageresults';

class Search extends Component {
  state = {
    searchText: '',
    amount: 15,
    apiUrl: 'https://pixabay.com/api',
    apiKey: 'PUT YOUR API KEY HERE FRO PIXBAY',
    images: []
  };

  onTextChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === '') {
        this.setState({ images: [] });
      } else {
        axios.get(
          `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
            this.state.searchText
          }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
        )
        .then(res => this.setState({ images: res.data.hits }))
        .catch(err => console.log(err));
      }
    });
  };

  onAmountChange = (e) => this.setState({ amount: e.target.value });

  render() {
    console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          label="Search For Images"
          fullWidth
        />
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel>Amount</InputLabel>
          <Select
            name="amount"
            value={this.state.amount}
            label="Amount"
            onChange={this.onAmountChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
