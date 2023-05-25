import React from 'react';
import Searchbar from './searchbar/Searchbar';
import Button from './button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages } from '../fetchImages';
import Loader from './loader/Loader';
import css from './app.module.css';

// let page = 1;

class App extends React.Component {
  state = {
    inputData: '',
    items: [],
    page: 1, //рефакторинг на componentDidUpdate
    status: 'idle',
    totalHits: 0,
    showButtonMore: false
  };

  async componentDidUpdate(_, prevState) {
    //рефакторинг на componentDidUpdate
    const { page, inputData } = this.state;
    if (inputData.trim() === '') {
      return;
    }
    if (prevState.inputData !== inputData) {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetchImages(inputData, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
        } else {
          this.setState({
            items: hits,
            inputData,
            totalHits: totalHits,
            status: 'resolved',
            showButtonMore: true
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
    if (prevState.page !== page && prevState.inputData === inputData) {
      this.setState({ status: 'pending' });

      try {
        const { hits } = await fetchImages(inputData, page);
        this.setState(prevState => ({
          items: [...prevState.items, ...hits],
          status: 'resolved',
          showButtonMore: true
        }));
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  // handleSubmit = async inputData => {
  //   page = 1;
  //   if (inputData.trim() === '') {
  //     return;
  //   } else {
  //     try {
  //       this.setState({ status: 'pending' });
  //       const { totalHits, hits } = await fetchImages(inputData, page);
  //       if (hits.length < 1) {
  //         this.setState({ status: 'idle' });
  //       } else {
  //         this.setState({
  //           items: hits,
  //           inputData,
  //           totalHits: totalHits,
  //           status: 'resolved',
  //         });
  //       }
  //     } catch (error) {
  //       this.setState({ status: 'rejected' });
  //     }
  //   }
  // };

  handleSubmit = inputData => {
    //рефакторинг на componentDidUpdate
    this.setState({
      inputData,
      items: [],
      page: 1,
      status: 'idle',
      totalHits: 0,
    });
  };

  // onNextPage = async () => {
  //   this.setState({ status: 'pending' });

  //   try {
  //     const { hits } = await fetchImages(this.state.inputData, (page += 1));
  //     this.setState(prevState => ({
  //       items: [...prevState.items, ...hits],
  //       status: 'resolved',
  //     }));
  //   } catch (error) {
  //     this.setState({ status: 'rejected' });
  //   }
  // };

  onNextPage = () => {
    //рефакторинг на componentDidUpdate
    this.setState(prevState => ({ page: prevState.page + 1, showButtonMore: false }));
  };

  render() {
    const { totalHits, status, items, showButtonMore } = this.state;
    if (status === 'idle') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={this.handleSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery items={this.state.items} />
          <Loader />
          {showButtonMore && totalHits > 12 && <Button onClick={this.onNextPage} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={this.handleSubmit} />
          <p>Something wrong, try later</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery items={this.state.items} />
          {showButtonMore && totalHits > 12 && totalHits > items.length && (
            <Button onClick={this.onNextPage} />
          )}
        </div>
      );
    }
  }
}

export default App;
