import React, { useState } from 'react'
import './SettingsAI.scss'
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function SettingsAI() {



    const [depth, setDepth] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setDepth(event.target.value);
      };

    const IOSSwitch = styled((props: SwitchProps) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
      ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#2ECA45',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color:
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#E9E9EA',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
      }));
      


      const [settings, setSettings] = useState({
        ANN: true,
        MCTS: true,
        DEPTH: 6,
        heuristic: 1,
        MINMAX: true,
        });

      const [settings2, setSettings2] = useState({
        ANN: true,
        MCTS: true,
        DEPTH: 6,
        heuristic: 1,
        MINMAX: true,
        });


        const [ANN , setANN] = useState(false);
        const [MCTS , setMCTS] = useState(false);
        const [MINMAX , setMINMAX] = useState(true);
        const [heuristic , setHeuristic] = useState(1);
        const [DEPTH , setDEPTH] = useState(0);


        function handleSwitch1(event) {

            setSettings({ ...settings, ANN: event.target.checked });
            
            console.log(event.target.checked)
            console.log(settings)
                
        }

        function handleSwitch2(event) {

            setSettings({ ...settings, MCTS: event.target.checked });
            
            console.log(event.target.checked)
            console.log(settings)
                
        }

        function handleSwitch3(event) {

            setSettings({ ...settings, MINMAX: event.target.checked });
            
            console.log(event.target.checked)
            console.log(settings)
                
        }


        function handleSwitch11(event) {

          setSettings2({ ...settings2, ANN: event.target.checked });
          
          console.log(event.target.checked)
          console.log(settings2)
              
      }

      function handleSwitch22(event) {

          setSettings2({ ...settings2, MCTS: event.target.checked });
          
          console.log(event.target.checked)
          console.log(settings2)
              
      }

      function handleSwitch33(event) {

          setSettings2({ ...settings2, MINMAX: event.target.checked });
          
          console.log(event.target.checked)
          console.log(settings2)
              
      }



        const navigate = useNavigate();
    
        function handleClick() {
            
            
            
            console.log(settings)



            axios({
                method: "POST",
                url:"/Settings",
                data: {
                  settings: settings,
            
                },
                
              })
              .then((response) => {
                const data =response.data
                
                console.log('-----------------------------------------------------')
                console.log("I received")
                console.log(data)
            
            
                
            
                
              }).catch((error) => {
                if (error.response) {
                  console.log(error.response)
                  console.log(error.response.status)
                  console.log(error.response.headers)
                  }
              })

              

        //   navigate("/game");
        }
      



const nav = useNavigate();
//data to be passed
const Data = settings
const Data2 = settings2
        


    return (

      
        <div id="conSet2">
          
          


          <div className="bigo">
            <div id="to">
              AI 1
            </div>

            <h1  id="titleSet2">Choose Your Settings</h1>

            <div id="to">
              AI 2
            </div>

          </div>

          <div className="gridSet2">

          

            <div id="Settings2">
                <div id="Settings12">
                    
                    <h1>ANN</h1>
                    
                    {/* <IOSSwitch onChange={handleSwitch1} sx={{ m: 1 }}  /> */}
                    <Switch onChange={handleSwitch1} sx={{ m: 1 }} defaultChecked />


                
                    
                    {/* <h1>MCTS</h1> */}
                    
                </div>

                <div id="Settings12">
                    
                    <h1>MCTS</h1>
                    
                    {/* <IOSSwitch onChange={handleSwitch1} sx={{ m: 1 }}  /> */}
                    <Switch onChange={handleSwitch2} sx={{ m: 1 }} defaultChecked />


                
                    
                    {/* <h1>MCTS</h1> */}
                    
                </div>

                <div id="Settings12">
                    
                    <h1>NegaMax</h1>
                    
                    <Switch onChange={handleSwitch3} sx={{ m: 1 }} defaultChecked />
                    
                    <h1>MINMAX</h1>
                    
                </div>

                <div id="Settings12">
                    
                    <h1>DEPTH</h1>


                    
                    
                    <div className="selecto2">
                    {/* <FormControl variant="standard" > */}
                        {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
                            <Select sx={{  minWidth: 120 }}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={settings["DEPTH"]}
                            onChange={(e) => {
                                const {
                                    target: { value },
                                } = e;
          
                                setSettings({ ...settings, DEPTH: value });
                    
                                console.log(value)
                                console.log(settings)
                            }}
                            label="Age"

                            


                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                    {/* </FormControl> */}
                    </div>
                    
                </div>

                <div id="Settings12">
                    
                    <h1>heuristic : </h1>
                    

                    {/* <FormControl> */}
                        {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                            <RadioGroup id='heuristic2'
                                onChange={(e) => {
                                    const {
                                        target: { value },
                                    } = e;
              
                                    setSettings({ ...settings, heuristic: parseInt(value) });
                        
                                    console.log(value)
                                    console.log(settings)
                                }}
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value={1} control={<Radio />} label="Premiere" />
                                <FormControlLabel value={2} control={<Radio />} label="Deuxieme" />
                                <FormControlLabel value={3} control={<Radio />} label="Troisieme" />
                                <FormControlLabel value={4} control={<Radio />} label="Quatri??me" />
                            </RadioGroup>
                    {/* </FormControl> */}
                    
                </div>

                {/* <div onClick={handleClick} id="start"> */}
                
            </div>



            <div id="Settings2">
                <div id="Settings12">
                    
                    <h1>ANN</h1>
                    
                    {/* <IOSSwitch onChange={handleSwitch1} sx={{ m: 1 }}  /> */}
                    <Switch onChange={handleSwitch11} sx={{ m: 1 }} defaultChecked />


                
                    
                    {/* <h1>MCTS</h1> */}
                    
                </div>

                <div id="Settings12">
                    
                    <h1>MCTS</h1>
                    
                    {/* <IOSSwitch onChange={handleSwitch1} sx={{ m: 1 }}  /> */}
                    <Switch onChange={handleSwitch22} sx={{ m: 1 }} defaultChecked />


                
                    
                    {/* <h1>MCTS</h1> */}
                    
                </div>

                <div id="Settings12">
                    
                    <h1>NegaMax</h1>
                    
                    <Switch onChange={handleSwitch33} sx={{ m: 1 }} defaultChecked />
                    
                    <h1>MINMAX</h1>
                    
                </div>

                <div id="Settings12">
                    
                    <h1>DEPTH</h1>


                    
                    
                    <div className="selecto2">
                    {/* <FormControl variant="standard" > */}
                        {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
                            <Select sx={{  minWidth: 120 }}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={settings2["DEPTH"]}
                            onChange={(e) => {
                                const {
                                    target: { value },
                                } = e;
          
                                setSettings2({ ...settings2, DEPTH: value });
                    
                                console.log(value)
                                console.log(settings2)
                            }}
                            label="Age"

                            


                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                    {/* </FormControl> */}
                    </div>
                    
                </div>

                <div id="Settings12">
                    
                    <h1>heuristic : </h1>
                    

                    {/* <FormControl> */}
                        {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                            <RadioGroup id='heuristic2'
                                onChange={(e) => {
                                    const {
                                        target: { value },
                                    } = e;
              
                                    setSettings2({ ...settings2, heuristic: parseInt(value) });
                        
                                    console.log(value)
                                    console.log(settings2)
                                }}
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value={1} control={<Radio />} label="Premiere" />
                                <FormControlLabel value={2} control={<Radio />} label="Deuxieme" />
                                <FormControlLabel value={3} control={<Radio />} label="Troisieme" />
                                <FormControlLabel value={4} control={<Radio />} label="Quatri??me" />
                            </RadioGroup>
                    {/* </FormControl> */}
                    
                </div>

                {/* <div onClick={handleClick} id="start"> */}
            </div>


          </div>


          <div onClick={() => { nav("/gameAI", { state:{
            settings: settings,
            settings2: settings2,
          }});}} id="start2">
                    
                    <h1 >Start</h1>

          </div>
    
        </div>
  )
}

export default SettingsAI










