import React,{ useState,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import{ StarBorderOutlined, ErrorOutlineOutlined } from '@material-ui/icons';

var page=0;
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
//retrieve the api according to the page and current date (30 days ago)
function get_api(){
  page=page+1;
  const today= new Date();
  const date= new Date(new Date().setDate(today.getDate()-30));
  var api= "https://api.github.com/search/repositories?q=created:>"+date.toISOString().split('T')[0]+"&sort=stars&order=desc&page="+page+"&per_page=100";
  return api;
};


export default function Repos() {
    
    const classes = useStyles();
    const [items, setItems] = useState([]);
    //retrieve json from api and add to array of items
    useEffect(() => {
      fetch(get_api())
        .then(res => res.json())
        .then(
          (result) => {
          
            setItems(result.items);
            console.log(result.items)
          },
    
        
        )
    },[]);
//map items to jsx and complex grid style
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