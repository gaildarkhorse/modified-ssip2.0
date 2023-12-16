import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import SaveIcon from '@material-ui/icons/Save';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
  navBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70px',
    backgroundColor: '#333',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.3s ease-out',
    transform: 'translateY(70px)', // Initially, hide the navigation bar below the viewport
  },
  showNavBar: {
    transform: 'translateY(0)', // Move the navigation bar to show at the bottom
  },
}));

function NavBar({saveCallback, sendCallback}) {
  const [showNav, setShowNav] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const bottom = window.innerHeight - e.clientY;
      setShowNav(bottom < 50); // Show the navigation bar when cursor is near the bottom
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`${classes.navBar} ${showNav ? classes.showNavBar : ''}`}>
      <div className="mr-20">
        <Button
          variant="outlined"
          style={{ justifyContentContent: 'center' }}
          type="submit"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={saveCallback}
        >
          Save
        </Button>
      </div>
      <div className="mr-20">
        <Button
          variant="outlined"
          style={{ justifyContentContent: 'center' }}
          type="outlined"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<EmailIcon />}
          onClick={sendCallback}
        >
          Send
        </Button>
      </div>


    </div>
  );
}

export default NavBar;
