import styled from 'styled-components';
import ImgSlider from './ImgSlider.js';
import Viewers from './Viewers.js';
import Recommended from './Recommended.js';
import NewDisney from './NewDisney.js';
import Originals from './Originals.js';
import Trending from './Trending.js';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import db from "../firebase.js";
import { setMovies } from '../features/movie/movieSlice.js';
import { selectUserName } from '../features/user/userSlice.js';
import { collection, query, onSnapshot } from 'firebase/firestore';

function Home(){
    const dispatch = useDispatch();
    const userName= useSelector(selectUserName);
    
    useEffect(()=>{
        let recommends = [];
    let newDisneys = [];
    let originals = [];
    let trendings = [];
        const q = query(collection(db, 'movies'));
        onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            switch(doc.data().type){
                case "recommend":
                    recommends = [...recommends, { id: doc.id, ...doc.data() }];
                    break;

                case "new":
                    newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
                    break;

                case "original":
                    originals = [...originals, { id: doc.id, ...doc.data() }];
                    break;

                case "trending":
                    trendings = [...trendings, { id: doc.id, ...doc.data() }];
                    break;
                default:
                    break;
            }
        });
    
        dispatch(setMovies({
            recommend: recommends,
            newDisney: newDisneys,
            original: originals,
            trending: trendings,
        })
        );
    });
        // eslint-disable-next-line
    },[userName]);

    return(
        <Container>
            <ImgSlider/>
            <Viewers/>
            <Recommended/>
            <NewDisney/>
            <Originals/>
            <Trending/>
        </Container>
    );
};

const Container = styled.main`
    position: relative;
    min-height: calc(100vh - 250px);
    padding: 0 calc(3.5vw + 5px);
    overflow-x: hidden;
    display: block;
    top: 72px;
    &:after{
        background: url("/images/home-background.png") center center / cover no-repeat fixed;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`;

export default Home;