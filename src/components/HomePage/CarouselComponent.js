import React, { Component } from 'react'
import { connect } from 'react-redux'
import Carousel from 'react-bootstrap/Carousel'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 'auto'
    },
    carousel: {
        width: '640px',
        height: '360px',
    },
    a: {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
    },
    img: {
        'height': '35vh'
    }
}));

const CarouselComponent = () => {
    const classes = useStyles()

    return (
        <div >
            <Carousel>
                <Carousel.Item >
                <h3>What Are Terpenes?</h3>

                    <a className={classes.a} href="https://www.cannainsider.com/reviews/cannabis-terpenes/" target='_blank'>
                        <img
                            className={classes.img}
                            src="https://leafipedia.net/wp-content/uploads/2020/07/cannabis-terpenes-effects-infographic.jpg"
                            alt="What Are Terpenes?"
                        />
                    </a>
                    {/* <Carousel.Caption>
                        <h3>What Are Terpenes?</h3>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item >
                    <h3>What Are Cannabinoids?</h3>
                    <br/>
                    <a className={classes.a} href="https://www.verilife.com/blog/guide-cannabinoids-and-their-effects#" target='_blank'>
                        <img
                            className={classes.img}
                            src="https://michigansandp.com/wp-content/uploads/2019/07/cannabinoids-in-the-body.jpg"
                            alt="What Are Cannabinoids?"
                        />
                    </a>

                    {/* <Carousel.Caption>
                        <h3>What Are Cannabinoids?</h3>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item >
                <h3>What Is The Entourage Effect?</h3>
                    <br/>
                    <a className={classes.a} href="https://leafipedia.net/cannabis-science/cannabis-derived-terpenes/" target='_blank'>
                        <img
                            className={classes.img}
                            src="https://static.wixstatic.com/media/62603b_b19a0d6ca6904309b6e1e0b27fedb34c~mv2.png/v1/fill/w_1000,h_1000,al_c,q_90/62603b_b19a0d6ca6904309b6e1e0b27fedb34c~mv2.webp"
                            alt="Third slide"
                        />
                    </a>

                    {/* <Carousel.Caption> */}
                        {/* <h3>What Is The Entourage Effect?</h3> */}
                        {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                    {/* </Carousel.Caption> */}
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CarouselComponent)
