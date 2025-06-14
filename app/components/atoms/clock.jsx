//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

import React, { useRef, useEffect } from 'react'
import { getAngle } from '../../services/clock.js'

const Clock = ({ props, clock, className, canvasSize }) => {
    const canvasRef = useRef(null)
    let draw;

    let size;
    const strokeWidth = 6;

    const resizeCanvas = (canvas) => {
        const { width, height } = canvas.getBoundingClientRect()

        if (canvas.width !== width || canvas.height !== height) {
            const { devicePixelRatio: ratio = 1 } = window
            const context = canvas.getContext('2d')
            canvas.width = width * ratio
            canvas.height = height * ratio
            context.scale(ratio, ratio)
            return true
        }

        return false
    }

    const handClock = (ctx, angle, relativeSize) => {
        ctx.save();
        ctx.translate(ctx.canvas.width - size, size);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.rotate(angle);
        ctx.lineTo(0, -size * relativeSize);
        ctx.lineWidth = strokeWidth / 2;
        ctx.stroke();
        ctx.restore();
    }

    draw = (ctx, frameCount) => {
        size = ctx.canvas.height / 2

        //-- background circle clock
        ctx.beginPath();
        ctx.arc(ctx.canvas.width - size, size, size, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();

        //stroke inside circle
        ctx.save();
        ctx.clip();
        ctx.lineWidth *= strokeWidth;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        //scheduled
        if (!clock.startTime) {
            const { angleMinutes, angleHours } = getAngle(clock.scheduledStartTime);

            //minute hand
            handClock(ctx, angleHours, 0.65);;

            //hour hand
            handClock(ctx, angleMinutes, 0.8);

            //small circle in the middel to connect the lines
            ctx.beginPath();
            ctx.arc(ctx.canvas.width - size, size, strokeWidth / 4, 0, 2 * Math.PI);
            ctx.fillStyle = "black";
            ctx.fill();
        }

        if (clock.startTime && clock.EndTime) {
            
        }

    }

    //past

    //now

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId

        resizeCanvas(canvas)

        //Our draw came here
        const render = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])


    return <canvas
        ref={canvasRef} {...props}
        className={className}
        width={canvasSize}
        height={canvasSize}
    />
}

export default Clock;