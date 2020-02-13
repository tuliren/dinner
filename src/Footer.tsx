import React from 'react';
import { BottomNavigation, BottomNavigationAction, Link } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';
import GitHubIcon from '@material-ui/icons/GitHub';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';

class Footer extends React.Component {
  public render() {
    return (
      <>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label={(
              <span className="site-uv">
                <span className="busuanzi-value" id="busuanzi_value_site_uv"/>
              </span>
            )}
            icon={<PeopleIcon fontSize="small"/>}
          />
          <BottomNavigationAction
            label={(
              <span className='site-pv'>
                <span className="busuanzi-value" id="busuanzi_value_site_pv"/>
              </span>
            )}
            icon={<VisibilityIcon fontSize="small"/>}>
          </BottomNavigationAction>
          <BottomNavigationAction
            component={Link}
            href="https://github.com/tuliren/dinner"
            target="_blank"
            label="Source"
            icon={<GitHubIcon fontSize="small"/>}
          />
          <BottomNavigationAction
            component={Link}
            href="https://github.com/tuliren"
            target="_blank"
            label="(c) 2020 LiRen"
            icon={<PersonIcon fontSize="small"/>}
          />
        </BottomNavigation>
      </>
    );
  }
}

export default Footer;
