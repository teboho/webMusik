export const playerButtonStyle = {
    fontSize: "36px"
}
export const queueContentStyle = {
    height: 400,
    width: "300",
    overflow: "auto",
    padding: '0 16px',
    margin: "0 auto",
    border: '1px solid rgba(140, 140, 140, 0.35)'
}
export const commentsListContentStyle = {
    borderTop: "1px solid",
    width: 300,
    margin: "0 auto"
}
export const gradientBackground = {
    background: "rgb(255,251,244)",
    background: "linear-gradient(90deg, rgba(255,251,244,1) 0%, rgba(255,247,233,1) 54%, rgba(255,255,255,1) 96%)" 
}
export const playerStyle = { 
    width: 360, margin: "5px auto", 
    ...gradientBackground,
    "-webkitbox-shadow": "2px 6px 19px 0px rgba(0,0,0,0.75)",
    "-moz-box-shadow": "2px 6px 19px 0px rgba(0,0,0,0.75)",
    "box-shadow": "2px 6px 19px 0px rgba(0,0,0,0.75)"
}
export const cardSubstyles = {
    "actions": gradientBackground                        
}
export const volumeSliderStyle = {position: "absolute", top: 50, float: "left", height: 300}
export const commentItemStyle = {width: "300px", margin: "0 auto"}