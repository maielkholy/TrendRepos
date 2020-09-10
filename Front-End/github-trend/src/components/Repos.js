import React,{ useState,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import{ StarBorderOutlined, ErrorOutlineOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1000,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

  
export default function ComplexGrid() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
      fetch("https://api.github.com/search/repositories?q=created:>2020-08-11&sort=stars&order=desc")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.items);
            console.log(result.items)
          },
    
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
    
    return(
      <div className={classes.root}>
        {items.map((repo,index)=>{
           return  (
               <div>       
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase focusRipple className={classes.image} href={repo.owner.html_url}>
                <img className={classes.img} alt="complex" src={repo.owner.avatar_url} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                <Button href={repo.html_url} color="primary">  
                  <Typography gutterBottom variant="subtitle1">
                    {repo.name}
                  </Typography>
                  </Button>
                  <Typography variant="body2" gutterBottom>
                    {repo.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                 {repo.owner.login}
                  </Typography>
                </Grid>
                <Typography variant="subtitle2"> 
                <StarBorderOutlined style={{ fontSize: 40 }}/>{ repo.stargazers_count}
                <ErrorOutlineOutlined style={{ fontSize: 35 }}/>{repo.open_issues}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
 </div>) })}
      </div>

    );
    
  }