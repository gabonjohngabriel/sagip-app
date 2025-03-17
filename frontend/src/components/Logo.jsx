import React from 'react';
import useStyles from "./Styles"; // Import as default

function Logo() {
  const styles = useStyles();

  return (
    <img 
      src="../images/healthcare.png" 
      alt="Healthcare" 
      className={styles.largeLogo}
    />
  );
}

export default Logo;