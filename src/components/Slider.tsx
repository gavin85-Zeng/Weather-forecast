import { Box, Grid, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { PrimaryTypography, SecondaryTypography } from "./ForecastCards";
import { ICurrent, IDailyEntity, ITemp } from "../model/WeatherInterface";
import Symbol from "../character/Symbol";
import { getDayStr, longToHourMinute } from "../Util";
import "../style/slider.scss"
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import WindPowerIcon from '@mui/icons-material/WindPower';
import AirIcon from '@mui/icons-material/Air';

const WaferIcon = () => {
    return (
        <svg role="img" xmlns="http://www.w3.org/2000/svg" style={{width: "1rem", height: "1rem", marginRight: "4px"}} fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/>
        </svg>
    )
}

const IconArrowDown = () => {
    return (
        <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
                fill="currentColor"
                d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
            />
        </svg>
    )
}

const ThermometerIcon = React.forwardRef((props:any, ref: any) => {
    return (
        <svg {...props} ref={ref} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
            <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0zM6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15V2.5z"/>
        </svg>
    )
})

const RainIcon = React.forwardRef((props:any, ref: any) => {
    return (
        <svg {...props} ref={ref} xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973z"/>
        </svg>
    )
})


const SlideButton = (props: { onClick: React.MouseEventHandler<HTMLButtonElement>, type: string }) => {
    const { onClick, type } = props;

    return (
        <button type="button" className={`slider-button slider-button-${type}`} onClick={onClick}>
            <span>
                <IconArrowDown />
            </span>
        </button>
    )
}

const Card = (props: {day: IDailyEntity}) => {
    const { day, ...other } = props;
    const weatherImg = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
    return (
        <Box className="slider-card" {...other}>
            <Grid container spacing={1} alignItems="center" sx={{textAlign: "center"}}>
                <Grid item xs={12}>
                    <PrimaryTypography>{getDayStr(day.dt)}</PrimaryTypography>
                </Grid>
                <Grid item xs={12}>
                    <SecondaryTypography>{day.weather[0].description}</SecondaryTypography>
                </Grid>
                <Grid item xs={5}>
                    <img src={weatherImg} alt="weathericon"/>
                </Grid>
                <Grid item xs={7}>
                    <Grid item>
                        <PrimaryTypography sx={{fontSize: 24}}>
                            <ArrowDropUpIcon sx={{ color: "#ff1a1a" }} />
                            {`${Math.round((day.temp as ITemp).max)}${Symbol.getDegree}`}
                        </PrimaryTypography>
                    </Grid>
                    <Grid item>
                        <PrimaryTypography sx={{fontSize: 24}}>
                            <ArrowDropDownIcon sx={{ color: "#4db8ff" }}/>
                            {`${Math.round((day.temp as ITemp).min)}${Symbol.getDegree}`}
                        </PrimaryTypography>
                    </Grid>
                    <Grid item>
                        <SecondaryTypography>
                            <WaferIcon />
                            {`${day.pop * 100}%`}
                        </SecondaryTypography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

const buildRiseSetCanvas = (type:string, rise: number, set: number) => {
    const canvas = document.querySelector(`#${type}-today-canvas`) as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const x = canvas.width / 2;
    const y = canvas.height / 1.2 - 15;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // convert time
    // rawdata time unit is unix
    rise *= 1000;
    set *= 1000;

    // draw baseline
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.arc(x, y, 100, 0, Math.PI, true); 
    ctx.strokeStyle = "#BDBDBD"
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // calculate progess
    const now = new Date().getTime();
    const isRise = now < rise;
    const isSet = now > set;

    let angle = 180;
    let percent = 0;

    if (isRise) {
        angle = 180;
        percent = 0;
    } else if (isSet) {
        angle  = 360;
        percent = 1;
    } else {
        const dayTime = set - rise;
        const progress = now - rise;
        percent = Math.round(((progress / dayTime) + Number.EPSILON) * 100 ) / 100;
        angle = (percent * 180) + 180;
    }

    const radians = angle * (Math.PI / 180);
    const calculateX = 100 * Math.cos(radians) + x;
    const calculateY = 100 * Math.sin(radians) + y;

    // set image at start & end point center
    const setImgCenter = (img: HTMLImageElement, reverse?: boolean) => {
        const w = canvas.width / 6;
        const h = canvas.height / 4;
        const cx = reverse === true ? x + (100 - w / 2) : x - (100 + w / 2);
        ctx.drawImage(img, cx, y + 3, w, h);
    }

    const pointImg = new Image();
    const riseImg = new Image();
    const setImg = new Image();
    pointImg.src = "/assets/sun.svg";
    riseImg.src = "/assets/sunrise.svg";
    setImg.src = "/assets/sunset.svg";

    if (type === "moon") {
        pointImg.src = "/assets/moon.svg";
        riseImg.src = "/assets/moonrise.png";
        setImg.src = "/assets/moonset.png";
    }
    riseImg.onload = () => {
        setImgCenter(riseImg);
    }
    setImg.onload = () => {
        setImgCenter(setImg, true);
    }

    // draw progess 
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(x, y, 100, Math.PI, Math.PI * (1 + percent));
    ctx.strokeStyle = type === "moon" ? "#757575" : "#f7c873";
    ctx.stroke();
    ctx.closePath();

    // draw sun current position
    pointImg.onload = () => {
        const size = 20;
        const offset = size / 2;
        ctx.drawImage(pointImg, calculateX - offset, calculateY - offset, size, size);
    }

    // fill time text
    ctx.beginPath();
    ctx.fillStyle = '#212121';
    ctx.font = "16px Merriweather";
    ctx.fillText(longToHourMinute(rise/1000), 0, y);
    ctx.closePath;

    ctx.beginPath();
    ctx.fillText(longToHourMinute(set/1000), canvas.width - 40, y);
    ctx.closePath;
}

const SunGrid = (props: {type: string, rise: number, set: number}) => {
    const { type, rise, set } = props;

    useEffect(() => {
        buildRiseSetCanvas(type, rise, set);
    }, [props]);
    
    return (
        <>
            <canvas id={`${type}-today-canvas`} />
        </>
    )
}

const DayDetails = (props: {day: IDailyEntity}) => {
    const { day } = props;

    const styleProps = {
        sx: {
            fontSize: 30,
            textAlign: "center"
        }
    }

    const customIconProps = {
        style: {
            width: "1.9rem",
            height: "1.9rem"
        }
    }

    return (
        <Box
            sx={{
                p: 4,
                borderRadius: 5,
                backgroundColor: "#fff",
                width: "100%",
                boxShadow: 1,
                color: "grey.800"
            }}
        >
            <Grid container spacing={1}>
                <Grid item container direction={"column"}>
                    <Grid item container xs alignContent="center" justifyContent="center">
                        <Grid item xs>
                            <SecondaryTypography {...styleProps}>
                                <Tooltip title="UV Index">
                                    <WbSunnyIcon sx={{fontSize: 30}}/>
                                </Tooltip>
                            </SecondaryTypography>
                            <PrimaryTypography {...styleProps}>
                                {Math.floor(day.uvi)}
                            </PrimaryTypography>
                        </Grid>
                        <Grid item xs>
                            <SecondaryTypography {...styleProps}>
                                <Tooltip title="Cloudiness(%)">
                                    <WbCloudyIcon sx={{fontSize: 30}}/>
                                </Tooltip>
                            </SecondaryTypography>
                            <PrimaryTypography {...styleProps}>
                                {day.clouds}
                            </PrimaryTypography>
                        </Grid>
                        <Grid item xs>
                            <SecondaryTypography {...styleProps}>
                                <Tooltip title="Atmospheric temperature">
                                    <ThermometerIcon {...customIconProps} />
                                </Tooltip>
                            </SecondaryTypography>
                            <PrimaryTypography {...styleProps}>
                                {day.dew_point}
                            </PrimaryTypography>
                        </Grid>
                    </Grid>
                    <Grid item container xs alignContent="center" justifyContent="center">
                        <Grid item xs>
                            <SecondaryTypography {...styleProps}>
                                <Tooltip title="Wind speed(m/s)">
                                    <WindPowerIcon sx={{fontSize: 30}}/>
                                </Tooltip>
                            </SecondaryTypography>
                            <PrimaryTypography {...styleProps}>
                                {Math.floor(day.wind_speed)}
                            </PrimaryTypography>
                        </Grid>
                        <Grid item xs>
                            <SecondaryTypography {...styleProps}>
                                <Tooltip title="Wind direction">
                                    <AirIcon sx={{fontSize: 30}}/>
                                </Tooltip>
                            </SecondaryTypography>
                            <PrimaryTypography {...styleProps}>
                                {`${day.wind_deg}${Symbol.getDegree}`}
                            </PrimaryTypography>
                        </Grid>
                        <Grid item xs>
                            <SecondaryTypography {...styleProps}>
                                <Tooltip title="Rain volume(mm)">
                                    <RainIcon {...customIconProps} />
                                </Tooltip>
                            </SecondaryTypography>
                            <PrimaryTypography {...styleProps}>
                                {day.rain ? day.rain : 0}
                            </PrimaryTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs>
                    <Grid item xs={12} md={6}>
                        <SunGrid type="sun" rise={day.sunrise as number} set={day.sunset as number}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SunGrid type="moon" rise={day.moonrise as number} set={day.moonset as number}/>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )

}

// not support TouchEvent
const Slider = (props: {daily: IDailyEntity[]}) => {
    const { daily } = props;
    // const [value, setValue] = useState(0);
    const [distance, setDistance] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [totalInViewport, setTotalInViewport] = useState(0);
    const [viewed, setViewed] = useState(0);
    const [selectValue, setSelectValue] = useState(0);
    const elementSize = 208;
    const elementCount = 7;
    const containerRef = useRef<HTMLDivElement>(null); 

    // rotate screen recalculate container width
    useEffect(()=> {
        function setWidth() {
            const containerWidth = (containerRef.current?.clientWidth as number);
            setContainerWidth(containerWidth);
        }

        setWidth();
        setTotalInViewport(Math.floor(containerWidth / elementSize));
        window.addEventListener('resize', setWidth);
        return () => window.removeEventListener("resize", setWidth);
    }, [containerRef.current, containerWidth])

    const handlePrev = () => {
        setViewed(viewed - totalInViewport);
        setDistance(distance + elementSize * totalInViewport);
    }

    const handleNext = () => {
        setViewed(viewed + totalInViewport);
        setDistance(distance - elementSize * totalInViewport);
    }

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const index = e.currentTarget.getAttribute('data-index') as string;
        setSelectValue(parseInt(index));
    }

    const hasPrev = distance < 0;
    const hasNext = (viewed + totalInViewport) < elementCount;
    const sevenDay = daily.slice(0, 7);
    const slideProps = {
        style: { transform: `translate3d(${distance}px, 0, 0)` }
    };

    return (
        <Grid container>
            <div className="slider">
                <div className="slider-wrapper">
                    <div className="slider-container" ref={containerRef} {...slideProps}>
                        {
                            sevenDay.map((day, index) => {
                                const bgProps = {
                                    style: { backgroundColor: "#faebcd" }
                                }
                                const bg = selectValue === index ? bgProps : "";
                                return (
                                    <Grid 
                                        item 
                                        key={day.dt} 
                                        sx={{p: 0.5}}
                                        data-index={index}
                                        onClick={handleClick}
                                    >
                                        <Card day={day} {...bg} />
                                    </Grid>
                                )
                            })
                        }
                    </div>
                </div>
                {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
                {hasNext && <SlideButton onClick={handleNext} type="next" />}
                
            </div>
            <Grid item xs>
                <DayDetails day={daily[selectValue]} />
            </Grid>
        </Grid>
    )
}

export default Slider;