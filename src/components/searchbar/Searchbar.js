import React from 'react';
import css from './css/searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends React.Component {
  state = {
    inputData: '',
  };

  onChangeInput = event => {
    this.setState({ inputData: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.inputData);
    this.setState({ inputData: '' });
  };

  render() {
    const { inputData } = this.state.inputData;
    return (
      <header className={css.searchbar}>
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            name="inputData"
            value={inputData}
            onChange={this.onChangeInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
