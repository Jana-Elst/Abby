//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

import React, { useRef, useEffect } from 'react'
import { getAngle } from '../../services/clock.js'

const Clock = ({ props, startTime = null, stopTime = null, active = false, size }) => {
    const canvasClock = useRef(null)
    let stop;
    //calculate time
    if (stopTime) {
        stop = stopTime;
    } else {
        // Get current time as HH:mm:ss
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        stop = `${hh}:${mm}:${ss}`;
    }

    const startAngle = getAngle(startTime);
    const stopAngle = getAngle(stop);

    const draw = ctx => {
        //background circle clock
        ctx.beginPath();
        ctx.arc(size, size, size, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();

        if (active || stopTime) {
            //arc
            ctx.save()
            ctx.translate(size, size);
            ctx.rotate(-Math.PI / 2);
            ctx.beginPath();
            ctx.arc(0, 0, size, startAngle, stopAngle);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.restore()

            //triangle
            ctx.save();
            ctx.translate(size, size);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.rotate(startAngle);
            ctx.lineTo(0, -size);
            ctx.rotate(stopAngle - startAngle);
            ctx.lineTo(0, -size);
            ctx.lineTo(0, 0);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.restore();

        } else {
            //pointer
            ctx.save();
            ctx.translate(size, size);
            ctx.rotate(startAngle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -size);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }
    }

    useEffect(() => {

        const canvas = canvasClock.current
        const context = canvas.getContext('2d')

        //Our draw come here
        draw(context)
    }, [draw])

    return (
        <canvas ref={canvasClock} {...props} />
    )
};

export default Clock;