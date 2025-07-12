import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(()=>{
        getMovieData(movieId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;

        try
        {
            const response = await api.post("/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId});

            const updatedReviews = [...reviews, {body:rev.value}];
    
            rev.value = "";
    
            setReviews(updatedReviews);
        }
        catch(err)
        {
            console.error(err);
        }
        



    }

  return (
    <Container style={{height:"85vh",paddingTop:"25vh",width:"60vw"}}> 
        <Row>
            <h3>Reviews</h3>
        </Row>
        <Row className="mt-2"> 
            <img src={movie?.poster} alt="" />
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((r) => {
                        return(
                            <>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </>
                        )
                    })
                }
            </Col>
        </Row>      
    </Container>
  )
}

export default Reviews
