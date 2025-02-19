import { Form,Button,Row,Col,Container,Image } from "react-bootstrap";
import Title from "../../components/title";
import Link from "next/link";
import kakao  from '../../assets/kakaobtn.png';
import getLayout from "../../components/layouts/getLayout";
import { signIn } from "next-auth/client";
import {useEffect, useState} from "react";
import {check_captcha, handleInput} from '../../components/feutils';

function Login(){
    const [userid, setUserid] = useState('');
    const [passwd, setPasswd] = useState('');
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

    useEffect(() => {
        const recaptchaScript = document.createElement("script");
        recaptchaScript.src = "https://www.google.com/recaptcha/api.js";
        recaptchaScript.async = true;
        recaptchaScript.defer = true;
        recaptchaScript.onload = () => setRecaptchaLoaded(true);
        document.body.appendChild(recaptchaScript);
    }, []);

    async function loginHandle(e){
            e.preventDefault();
        if (grecaptcha.getResponse() && await check_captcha(grecaptcha.getResponse())) {
            const {error} = await signIn('userid-passwd-credentials',{userid,passwd, redirect:false});
            if(error){
                alert('존재하지 않는 아이디이거나 패스워드가 일치하지 않습니다.');
            }else{
                location.href= '/member/mypage';
            }
    }
}

    return (
        <Container className="panel">
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formTitle">
                    <Col sm="6">
                        <Title className="title" title="로그인" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formID">
                    <Col sm="6">
                        <Form.Control type="text" placeholder="아이디를 입력하세요"  value={userid} onChange={(e)=>{handleInput(setUserid,e)}} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPassword">
                    <Col sm="6">
                        <Form.Control type="password" placeholder="비밀번호를 입력하세요" value={passwd} onChange={(e)=>{handleInput(setPasswd,e)}} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formID">
                    <Col sm="5">{recaptchaLoaded && (
                        <div className="g-recaptcha cap2" data-sitekey="6LdL4OskAAAAAK7rwtgYuLMdFMXONFJgc5hhBcaX"></div>
                    )}</Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="sns">
                    <Col sm>
                        <div className="kakaoLogin" onClick={() => signIn('kakao',{ callbackUrl: "/member/check?" })}>
                            <Image className="ms-2" src={kakao}/>
                            <span className="ms-2">카카오 로그인</span>
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCheckbox">
                    <Form.Check type="checkbox" label="아이디 자동 저장" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formForget">
                    <Link href="#">비밀번호를 잊으셨나요?</Link>
                </Form.Group>
                <br/>
                <Form.Group className="mb-3" controlId="formSubmit">
                    <Col sm>
                    <Button variant="success" type="submit" onClick={(e)=>{loginHandle(e)}}>
                        로그인하기
                    </Button>
                    <Button variant="secondary" className="ms-2" onClick={()=>{location.href='/member/join'}}>
                        회원 가입하기
                    </Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}

getLayout(Login,{title:'함께해요! WAKAUT',description:'워크아웃에 가입하시면 다양한 정보를 받을 수 있습니다.'});
export default Login