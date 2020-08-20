import React, { useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Button } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import { useUserStateDispatch, RoleType } from "../contexts/UserContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        padding: theme.spacing(3),
        width: theme.spacing(64),
        height: theme.spacing(48),
        color: theme.palette.text.primary,
      },
    },
  })
);

function LoginPageComponent() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState<RoleType>("teacher");
  const dispatch = useUserStateDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setValue(value as RoleType); // 라디오 버튼이므로 타입에 확신을 가진다.
  };
  const handleBack = () => {
    history.replace("/");
  };

  const handleLogin = () => {
    dispatch({
      type: "LOGIN",
      isLogin: true,
      id: "아이디",
      password: "패스워드",
      role: value,
    });
    if (value === "teacher") {
      history.replace("/teacher");
    } else {
      history.replace("/student");
    }
  };

  useEffect(() => {
    const electron = window.require("electron");
    const ipcRenderer = electron.ipcRenderer;
    ipcRenderer.send("resize", { x: 800, y: 600 });
  }, []);

  return (
    <header className="App-header">
      <div className={classes.root}>
        <Paper elevation={3} variant="outlined">
          <Grid container spacing={3}>
            <form noValidate autoComplete="off" style={{ width: "100%" }}>
              <Grid item xs={1}>
                <Fab variant="extended" onClick={handleBack}>
                  <ArrowBackIosIcon />
                  뒤로
                </Fab>
              </Grid>
              <Grid item xs={12}>
                로그인
              </Grid>
              <Grid item xs={12}>
                &nbsp;
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="kind"
                    name="kind1"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="teacher"
                      control={<Radio color="primary" />}
                      label="교수자"
                    />
                    <FormControlLabel
                      value="student"
                      control={<Radio color="primary" />}
                      label="수강생"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField id="input-id" label="ID/사번" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="input-id"
                  type="password"
                  label="비밀번호"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button onClick={handleLogin}>
                  {value === "teacher" ? "교수자" : "수강생으"}로 로그인
                </Button>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </div>
    </header>
  );
}

export default LoginPageComponent;
