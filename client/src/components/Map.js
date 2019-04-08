import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import { withStyles } from '@material-ui/core/styles';
import PinIcon from './PinIcon';
import Blog from './Blog';
import Context from '../context';
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_STATE = {
  latitude: 51.562564,
  longitude: -0.065882,
  zoom: 13
};

const Map = ({ classes }) => {
  const [viewport, setViewport] = useState(INITIAL_STATE);
  const [userPosition, setUserPosition] = useState(null);
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    getUserPosition();
  }, []);

  const getUserPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ longitude, latitude });
      });
    }
  };

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!state.draft) {
      dispatch({ type: 'CREATE_DRAFT' });
    }
    const [longitude, latitude] = lngLat;
    dispatch({
      type: 'UPDATE_DRAFT_LOCATION',
      payload: { longitude, latitude }
    });
  };

  return (
    <div className={classes.root}>
      <ReactMapGL
        onClick={handleMapClick}
        onViewportChange={newViewport => setViewport(newViewport)}
        {...viewport}
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1Ijoic2xlZXBsZXNzMDAwIiwiYSI6ImNqdTczaDJzdDEwZnU0NG81NjVva2R2YzMifQ.PbyTQQzlJbUbK0vZ3ST4Ig"
      >
        <div className={classes.navigationControl}>
          <NavigationControl
            onViewportChange={newViewport => setViewport(newViewport)}
          />
        </div>
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="red" />{' '}
          </Marker>
        )}
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="hotpink" />{' '}
          </Marker>
        )}
      </ReactMapGL>
      <Blog />
    </div>
  );
};

const styles = {
  root: {
    display: 'flex'
  },
  rootMobile: {
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  navigationControl: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '1em'
  },
  deleteIcon: {
    color: 'red'
  },
  popupImage: {
    padding: '0.4em',
    height: 200,
    width: 200,
    objectFit: 'cover'
  },
  popupTab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
};

export default withStyles(styles)(Map);
