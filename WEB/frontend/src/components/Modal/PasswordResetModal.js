import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import React, { useState } from 'react';
import { useHistory } from 'react-router'

const PasswordResetModal=(props)=>{
  let [JoinLoign,setJoinLogin] = useState('비밀번호 찾기')
  let [userpassword, setUserPassword] = useState()
  let [userpasswordCheck, setUserPasswordCheck] = useState();
  let usertoken = document.URL.split("=")[1];


  const data = {password : userpassword,token : usertoken, }

const handlePassword1Change = (e) => {
  setUserPassword(e.target.value)
}

const handlePassword2Change = (e) => {
  setUserPasswordCheck(e.target.value)
}

    const history = useHistory()

    const paperStyle={padding :40,height:'70vh',width:800, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'10px 0'}
    return(
      <Grid>
      <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
               <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
              <h2>{JoinLoign}</h2>
          </Grid>
          <TextField label='새 비밀번호' placeholder='새 비밀번호를 입력해 주세요.' type='password' fullWidth required  onChange={handlePassword1Change}/>
          <TextField label='새 비밀번호 확인' placeholder='새 비밀번호를 다시 입력해 주세요.' type='password' fullWidth required  onChange={handlePassword2Change}/>
          <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth className="JoinLoign-button" onClick={(e)=>{
                  e.preventDefault()
                  alert(JSON.stringify(data))
                  if(userpassword !== userpasswordCheck){
                    alert("비밀번호가 서로 일치하지 않습니다!")
                  }else{
                    fetch('/api/password-reset/confirm/', {
                      method: 'POST',
                      headers:{
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data)
                    }).then(res => res.json())
                    .then(json => {
                      if(json.status==="OK"){
                          alert("성공적으로 변경되었습니다.");
                          history.push("/");
                      }else{
                          alert("비밀번호를 다시 확인 해 주세요.")
                      }
                    })
                    .catch(error => alert(error));
                    };

                  }
                  }>전송</Button>
          <Typography >
          <br></br>
               <Link href="/login" >
                  로그인
          </Link>
          </Typography>
      </Paper>
  </Grid>
    )
}

export default PasswordResetModal