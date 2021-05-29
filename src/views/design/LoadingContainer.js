import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Dog1 = styled.div`
  position: absolute;
  left: center;
  top: center;
  transform: rotate(45deg) translateX(80px) rotate(-45deg);
  animation: orbit2 3s linear infinite; 
  animation-delay: -2s;
  @keyframes orbit2 {
\tfrom  {  transform: rotate(-180deg) translateX(80px) rotate(180deg); }
\tto   {  transform: rotate(180deg) translateX(80px) rotate(-180deg); }
`

const Dog2 = styled.div`
  position: absolute;
  left: center;
  top: center;
  transform: rotate(90deg) translateX(80px) rotate(-90deg);
  animation: orbit2 3s linear infinite; 
  animation-delay: -1s;
  @keyframes orbit2 {
\tfrom  {  transform: rotate(0deg) translateX(80px) rotate(0deg); }
\tto   {  transform: rotate(360deg) translateX(80px) rotate(-360deg); }
`

const Dog3 = styled.div`
  position: absolute;
  left: center;
  top: center;
  transform: rotate(45deg) translateX(80px) rotate(-45deg);
  animation: orbit2 3s linear infinite; 
  @keyframes orbit2 {
\tfrom  {  transform: rotate(-180deg) translateX(80px) rotate(180deg); }
\tto   {  transform: rotate(180deg) translateX(80px) rotate(-180deg); }
`
const Dog4 = styled.div`
  position: absolute;
  left: center;
  top: center;
  transform: rotate(90deg) translateX(80px) rotate(-90deg);
  animation: orbit2 3s linear infinite; 
  animation-delay: -3.5s;
  @keyframes orbit2 {
\tfrom  {  transform: rotate(0deg) translateX(80px) rotate(0deg); }
\tto   {  transform: rotate(360deg) translateX(80px) rotate(-360deg); }
`
const Dog5 = styled.div`
  position: absolute;
  left: center;
  top: center;
  transform: rotate(90deg) translateX(80px) rotate(-90deg);
  animation: orbit2 3s linear infinite; 
  animation-delay: -4.5s;
  @keyframes orbit2 {
\tfrom  {  transform: rotate(0deg) translateX(80px) rotate(0deg); }
\tto   {  transform: rotate(360deg) translateX(80px) rotate(-360deg); }
`

const Dog6 = styled.div`
  position: absolute;
  left: center;
  top: center;
  transform: rotate(45deg) translateX(80px) rotate(-45deg);
  animation: orbit2 3s linear infinite; 
  animation-delay: -5.5s;
  @keyframes orbit2 {
\tfrom  {  transform: rotate(-180deg) translateX(80px) rotate(180deg); }
\tto   {  transform: rotate(180deg) translateX(80px) rotate(-180deg); }
`
class LoadingContainer extends React.Component {

  render() {
    return(<div className="space-x-4 z-50 w-screen h-full flex-1 overflow-auto p-4 z-10 bg-gray-100" disabled={true}>
      <div className="flex h-16 mt-20 flex-col items-center flex justify-center  text-4xl" >
        <Dog1 >🐩</Dog1>
        <Dog2>🐕‍🦺</Dog2>
        <Dog3>🐕</Dog3>
        <Dog4>🦮</Dog4>
        <Dog5>🐆</Dog5>
        <Dog6>🐅</Dog6>
        <span className="flex">🦴 </span>
      </div>
      <h1 className=" p-16 mx-auto text-center font-semibold text-2xl mt-5 text-gray-900 ">{this.props.loadingtext}</h1>
    </div>
    )
  }
}
export default LoadingContainer;
