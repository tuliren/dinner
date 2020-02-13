import React from 'react';
import { BottomNavigation, BottomNavigationAction, Link } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import PageviewIcon from '@material-ui/icons/Pageview';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';

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
                <span className="busuanzi-value" id="busuanzi_value_page_pv"/>
              </span>
            )}
            icon={<PageviewIcon fontSize="small"/>}>
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
