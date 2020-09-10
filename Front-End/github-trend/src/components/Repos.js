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

function get_api(page){
  const today= new Date();
  const date= new Date(new Date().setDate(today.getDate()-30));
  var api= "https://api.github.com/search/repositories?q=created:>"+date.toISOString().split('T')[0]+"&sort=stars&order=desc?page=${page}"
  return api;
};
export default function ComplexGrid() {
    
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
      fetch(get_api(1))
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
                  Submitted on {repo.created_at.split('T')[0]} by {repo.owner.login}
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