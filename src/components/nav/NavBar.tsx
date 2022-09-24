import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import { LABELS, pathKeys, paths } from '../../utils/constants';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { styled } from "@mui/material/styles";

const NavigationAction = styled(BottomNavigationAction)(`
  color: '';
  &.Mui-selected {
    color: green;
  }
`);

function LabelBottomNavigation({expenseStore:{username, currency}}: {expenseStore: {username: string, currency:string}}) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(LABELS.overview);
  const {pathname} = window?.location;


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(paths[newValue]);
  };

  useEffect(() => {
    if(pathname) setValue(pathKeys[pathname] || LABELS.overview);
  }, [pathname]);

  return (
    username && currency ?
    <BottomNavigation 
      sx={{
        boxShadow: '0 0 10px grey',
        position: 'fixed',
        bottom: '0',
        left: '0',
        background: '#e5e5e5db',
        height: 'auto',
        width:'100%',
      }}
        value={value}
        onChange={handleChange}
        showLabels
    >
      <NavigationAction
        label={LABELS.overview}
        value={LABELS.overview}
        icon={<HomeIcon fontSize="medium" />}
      />
      <NavigationAction
        label={LABELS.history}
        value={LABELS.history}
        icon={<RestoreIcon fontSize="medium" />}
      />
      <NavigationAction
        label={LABELS.addNew}
        value={LABELS.addNew}
        icon={<AddCircleIcon fontSize="medium" />}
      />
      <NavigationAction
        label={LABELS.statistics}
        value={LABELS.statistics}
        icon={<AssessmentIcon fontSize="medium" />}
      />
      <NavigationAction
        label={LABELS.profile}
        value={LABELS.profile}
        icon={<PersonIcon fontSize="medium" />}
      />
    </BottomNavigation> : <></>
  );
}

export default observer((LabelBottomNavigation));
