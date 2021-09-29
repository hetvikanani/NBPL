import styled, { createGlobalStyle } from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";
export const AppContainer = styled.div`
  height: 100vh;
  .txtWrap {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-size:14px;
  font-weight: 400;
  overflow-x: hidden; 
}
.container{
  background: #f8f9fa;
  height: 100vh;
  overflow-y: auto;
  width:100%;
}
.center{
  text-align: center;
}
overflow-y: scroll;
overflow-x: hidden;
scrollbar-color: transparent;
scrollbar-width: thin;
::-webkit-scrollbar {
  margin:5px;
  width: 7px; 
  height: 1px;
  background-color:#fff;
}
::-webkit-scrollbar-thumb {
  // border-radius:5px;
  background-color: ${Theme.mainColor};
}
.none {
  display: none;
}
.form-error {
  color: #e81c1c;
}
.pointer {
  cursor: pointer;
}
a {
  color: #fff; 
}
button[disabled]{
  opacity: 0.5;
  cursor: not-allowed;
}
h1, h2, h3, h4, h5, h6 {
  color:inherit;
}
.wordbr {
  word-break: break-all;
}
.btnDiv {
  margin-top: 1em;
  button {
    margin-left: auto;
    display: block;
    border-radius: 10px;
    // @media ${size["tablet-md-max"]} {       
    //   margin: auto;    
    // }
    span {
      margin-right: 5px;
    }
  }
  .nextDiv {
    display: flex;
    button + button {
      margin-left: 1em;
    }
  } 
}
.txtWrap {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.fadeInDown {    
  animation-name: fadeInDown;
  animation-duration: 1s;   
  animation-timing-function: ease-in-out;   
  visibility: visible !important;   
}
@keyframes fadeInDown {
  0% {transform: translateY(-150%);}  
  100% {transform: translateY(0%);}	
}
.anime{
  opacity: 0;
  position: relative;
  animation: anime-animation 0.4s ease-in-out 0.33333s;
  animation-fill-mode: forwards;
  transform: translateX(50px);     
}
@-webkit-keyframes anime-animation {
  to {
    opacity: 1;
    transform: translatex(0);
  }
}
@keyframes anime-animation {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.anime:first-child{
  z-index: 20;
  animation-delay: .1s;
}
.anime:nth-child(2){
  z-index: 19;
  animation-delay: .2s;
}
.anime:nth-child(3){
  z-index: 18;
  animation-delay: .3s;
}
.anime:nth-child(4){
  z-index: 17;
  animation-delay: .4s;
}
.anime:nth-child(5){
  z-index: 16;
  animation-delay: .5s;
}
.anime:nth-child(6){
  z-index: 15;
  animation-delay: .6s;
}
.anime:nth-child(7){
  z-index: 14;
  animation-delay: .7s;
}
.anime:nth-child(8){
  z-index: 13;
  animation-delay: .8s;
}
.anime:nth-child(9){
  z-index: 12;
  animation-delay: .9s;
}
.anime:nth-child(10){
  z-index: 11;
  animation-delay: .91s;
}
.anime:nth-child(11){
  z-index: 10;
  animation-delay: .92s;
}
.anime:nth-child(12){
  z-index: 9;
  animation-delay: .93s;
}
.anime:nth-child(13){
  z-index: 8;
  animation-delay: .94s;
}
.anime:nth-child(14){
  z-index: 8;
  animation-delay: .95s;
}
.anime:nth-child(15){
  z-index: 7;
  animation-delay: .96s;
}
.anime:nth-child(16){
  z-index: 6;
  animation-delay: .97s;
}
.anime:nth-child(17){
  z-index: 5;
  animation-delay: .98s;
}
.anime:nth-child(18){
  z-index: 4;
  animation-delay: .99s;
}
.anime:nth-child(19){
  z-index: 3;
  animation-delay: .991s;
}
.anime:nth-child(20){
  z-index: 2;
  animation-delay: .992s;
}
.highZ{z-index: 22!important;}
.highZ2{z-index: 20!important;}
`;
export default GlobalStyle;
