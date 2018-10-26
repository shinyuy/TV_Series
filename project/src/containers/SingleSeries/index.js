import React, {Component} from 'react';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

class SingleSeries extends Component {
    state = {
        show: null
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
        .then(response => response.json())
        .then(json => this.setState({ show: json }));
    }

    render() {
        const { show } = this.state;
        console.log(show);
        return (
          <div>
              { show === null && <Loader />}
              {
                  show !== null
                  &&
                  <div>
                      <p>{show.name}</p>
                      <p>Premiered - {show.premiered}</p>
                      <p>Rating - {show.rating.average}</p>
                      <p>Episodes - {show._embedded.episodes.length}</p>
                      <p>Language - {show.language}</p>
                      <BrowserRouter><Link to={show.url}><p>URL - {show.url}</p></Link></BrowserRouter>
                      <p>Schedule - {show.schedule.days}</p><p>{show.schedule.time}</p>
                      <p>On - {show.network.name}</p><p>Timezone - {show.network.country.timezone}</p>
                      <p>
                          <img alt="show" src={show.image.medium} />
                      </p>
                      <p>Summary - {show.summary}</p>
                  </div>
              }
          </div>
        )
    }
}

export default SingleSeries;