import React from 'react';

const { useEffect, useState } = React;

function Slides({slides}) {
    const [slideNum, setSlideNum] = useState(0);

    useEffect(() => {
        setSlideNum(0);
    }, []);

    return (
        <div>
            <div id="navigation" className="text-center">
                <button data-testid="button-restart" className="small outlined" onClick = {() => {
                  setSlideNum(0);
                }} disabled = {slideNum === 0}>Restart</button>
                <button data-testid="button-prev" className="small" onClick = {() => {
                  setSlideNum(slideNum - 1);
                }} disabled = {slideNum === 0}>Prev</button>
                <button data-testid="button-next" className="small" onClick = {() => {
                  setSlideNum(slideNum + 1);
                }} disabled = {slideNum === slides.length-1}>Next</button>
                {slideNum}
            </div>
            <div id="slide" className="card text-center">
                <>
                  <h1 data-testid="title" >{slides[slideNum].title}</h1>
                  <p data-testid="text" >{slides[slideNum].text}</p>
                </>
            </div>
        </div>
    );


}

export default Slides;
