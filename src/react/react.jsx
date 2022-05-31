import React from 'react';
import reactLogo from '../media/react-js.png';
import angularLogo from '../media/angularLogo.png';
import redmaneLogo from '../media/redmaneLogo.png';

function AboutMe(props){
    return(
        <div className="about-content">
            <h1>About Me</h1>
            
            <p> I am a recent graduate with a B.S. in Computer Science from Northern Illinois University, looking for a junior level software developer position.
                I am skilled in many popular programming languages and frameworks. 
            </p>

            <p>(For a detailed list go to <a href="#skills">My Skills</a>).</p>

            <h3>Personal Life</h3>

            <p>
                I was born and raised in Tinley Park, Illinois. My first experience with programming was in AP Computer Science.
                I was a natural at it, and instantly got hooked. I decided to make CS my major.
                Shortly after college, I started work with my first job at RedMane Technology. 
                I plan on staying near the Chicago area, and I am excited to continue to grow my career.
            </p>

            <h3>Hobbies</h3>
            <p>
                    I like to keep both my logical and creative side stimulated. Besides programming in my free time, a good way to do this is by playing my favorite game,
                Dungeons and Dragons. I create my own plot lines and run them with a small group once a week. I also enjoy a lot of tabletop games that I play with friends and family. 
            </p>
            <p>
                In addition to programming at work, I am constantly keeping up on new programming technologies on my own time. I enjoy creating my own projects for personal use.
            </p>
            <p>
                Interested in my personal projects? Take a <a href="#projects">look</a>.
            </p>
        </div>
    );
}

function Header(props){
    return(
        <div className="header">
            <h1 id="top">Alexander Quatrini</h1>
            <p>Passionate, Efficient, and Creative Development</p>
        </div>
    );
}

class RadioSelectDiv extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {id:0};
    
        this.selectDiv = this.selectDiv.bind(this);
        this.unfocusedListItems = [];
        this.listItems = [];
    }

    componentDidMount(){
        this.setState({id:0});
        this.timerID = setInterval(() => this.selectDiv(this.state.id+1), 5000);
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    onUpdateItem = i => {

        this.setState(state => {
            const focus = this.props.focus.map(item => false);
       
            return {
              focus,
            };
          });

        this.setState(state => {
            const focus = this.props.focus.map((item, j) => {
                if(j===i)
                {
                    return !item;
                } else{
                    return item;
                }
            });
            return{
                focus,
            };
        });
    };

    selectDiv(value){

        clearInterval(this.timerID);
        this.timerID = setInterval(() => this.selectDiv(this.state.id+1), 5000);


        if(value >= this.props.lists.length)
        {
            value = 0;
        }

        this.setState({id: value});

        this.timer = setTimeout(() => this.onUpdateItem(this.state.id), this.setState({focused: true}), 500);

    }

    render(){

        this.unfocusedListItems = [];
        this.listItems = [];

        for(let i = 0; i < this.props.lists.length; i++){
            if(i !== this.state.id){
                this.unfocusedListItems.push(<div onClick={() => this.selectDiv(i)} className="focused-out option"><ul><li key={i.toString() + " unfocus"}> &#x2022; {this.props.titles[i]} &#x2022;</li></ul></div>);
            }
            else{
                this.unfocusedListItems.push(<div className="small-focus option"><ul><li key={i.toString() + " small-focus"}>&#x2022; {this.props.titles[i]} &#x2022;</li></ul></div>);
            }
        }

        this.listItems = this.props.lists[this.state.id].map((number) =>
    <li key={number.toString() + " focused"}>
      {number}
    </li>);

        var classes = this.state.focused ? "focused-in details main-focus" : "focused-out details main-focus";

        return(
            <div className="radio-wrapper">
                    <div className="radio-unfocus">
                        {this.unfocusedListItems}
                    </div>

                    <div className="radio-focus">
                        <ul className={classes}>
                            {this.listItems}
                        </ul>
                    </div>
            </div>
        );
    }
}

function GradientImage(props){
    return(
        <div className="gradient-image" style={{height: props.height}}>{props.children}</div> 
    );
}

class BackToTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {visible: false};
        this.text = props.text;
        this.desiredClassName = props.desiredClassName;
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(){

        if(document.body.scrollTop > 150 || document.documentElement.scrollTop > 150)
        {
            if(!this.state.visible)
                this.setState({visible: true});
        }
        else
        {
            if(this.state.visible)
                this.setState({visible: false});
        }
    }

    render(){
        var classnames = this.state.visible ? this.desiredClassName + " visible" : this.desiredClassName;

        return(
            <a className={classnames} href="#root">{this.text}</a>
        )
    }
}

function FadeInComponent(props){
    const CustomType = `${props.type}`;
    return(
        <FadeIn once={props.once} delay={props.delay}>
            <CustomType id={props.id} href={props.destination} className={props.class}>{props.text}</CustomType>
        </FadeIn>
    );
}

  

class FadeIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {inViewPort: false};
        this.once = props.once;
        this.delay = props.delay;
        
        this.handleScroll = this.handleScroll.bind(this);

        this.ref = React.createRef();
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(){
        var rect = this.ref.current.getBoundingClientRect();
        
        if(!this.state.inViewPort)
        {

            if(rect.top <= (window.innerHeight || document.documentElement.clientHeight)){
                this.setState({inViewPort: true});
            }
        }
        else if(!this.once && rect.top > (window.innerHeight || document.documentElement.clientHeight)){
                this.setState({inViewPort: false});
        }
    }

    render(){

        var classnames = this.state.inViewPort ? "visible " : "";
        classnames = this.once ? classnames+"fade once" : classnames+"fade"
        return(
            <div ref={this.ref} style={{transitionDelay: this.delay}} className={classnames}>{this.props.children}</div>
        )
    };
}
function Intro(props){
    return(
            <div className="content">
                <div className="intro-navbar">
                    <FadeInComponent once={true} destination="#aboutme" text="About Me" delay="0s" type="a" class="link"/>
                    <FadeInComponent once={true} destination="#skills" text="My Skills" delay="0.5s" type="a" class="link"/>
                    <FadeInComponent once={true} destination="#experience" text="My Experience" delay="0.5s" type="a" class="link"/>
                    <FadeInComponent once={true} destination="#qualities" text="My Qualities" delay="1s" type="a" class="link"/>
                    <FadeInComponent once={true} destination="#projects" text="My Projects" delay="1.5s" type="a" class="link"/>
                    <FadeInComponent once={true} destination="#contactme" text="Contact Me" delay="2s" type="a" class="link"/>
                </div>
            </div>
    );
}


function Skills(props){
    return(
        <div className="skills-content">
            <h1>My Skills</h1>        
        <div className = "list-wrapper">
            <RadioSelectDiv lists = {[["JavaScript", "React JS", "Angular v1, v11", "HTML", "CSS", "SQL", "PHP", "jQuery"], 
            ["C++", "C#", "Java", ".NET Core 5.0", ".NET Framework 4.7.2", "Python"], ["Swift", "Android Studio", "XCode"], 
            ["Git", "Visual Studio", "vim", "Sublime Text", "Eclipse"], ["Windows", "Unix", "Docker", "XAMPP", "AGILE"]]} 
            titles = {["Web", "Software", "Mobile", "Tools", "Misc."]} focus={[true,false,false,false,false]}/>
        </div>
            {/*<p>Web Development: My favorite type of development. Front-end is specifically my favorite. This website uses most of the front-end technologies listed including React,
            HTML, and CSS.
            </p>
            <p>Software Development: The meat and potatoes of programming, my coursework in C++, Java, and .NET taught me OOP principles, 
                popular algorithms and data structures, and the MVC design philosophy. Interested to see what I've done? 
                Go to:<a href="#projects"> my projects.</a></p>
            <p>Mobile Development: Whether you want to develop for Apple or Android, I'm proficient in both!</p>
            <p>Development Tools: Whether your team codes in a terminal or an advanced IDE, I'll feel right at home.
                 This website was coded on Visual Studio Code, both on Windows and Unix systems (mostly Unix - MacOS), using git as version control.</p>
            <p>Miscellaneous: I am confident I can code on any environment, but I'm most confident on a Windows or Unix machine, with AGILE code practices.</p>*/}
        </div>
    );
}

function Experience(props){
    return(
        <div className="experience-content">
            <h1>My Experience</h1>
            <img src={redmaneLogo} class="experience-image"></img>
            <FadeInComponent once={true} delay="0s" text="RedMane Technology" type="h2"/>
            <FadeInComponent once={true} delay="0.5s" text="June 2021-April 2022" type="h3"/>
            <FadeInComponent once={true} text="The start to my career. While at RedMane I worked with an open source content management system built on .NET called Umbraco to
            create a citizen facing website portal that allows foster parents to view and update information, create appointments, and view information on their placements.
            While working on the project, Umbraco updated to version 9, which made the switch from .NET framework 4.7.2 to .NET core 5.0.
            As a result I have a fair amount of experience with both .NET framework, .NET core and the transition between the two. I transitioned to working with Java
            and a social program management platform called Cúram. I worked with the Missouri Eligibility Determination and Enrollment System (MEDES)." type="p" delay="0.5s"/>
        </div>
    )
}

function Qualities(props){
    return(
        <div className="qualities-content">
            <h1>My Qualities</h1>
            <FadeInComponent once={true} delay="0s" text="Passion" type="h2"/>
            <FadeInComponent once={true} text="I am always looking to improve my skillset and solve unique challenges. 
            When programming, bugs are bound to show up. Most people look at them as nuisances. 
            I view them as a challenge, and when I fix a particularly nasty or persistent bug, 
            I experience a surge of satisfaction." type="p" delay="0.5s"/>

            <FadeInComponent once={true} delay="0s" text="Detail-Oriented" type="h2"/>
            <FadeInComponent once={true} text="When programming for long periods of time, it's easy to overlook small details. 
            I make a point of looking for the little things." type="p" delay="0.5s"/>
            <FadeInComponent once={true} delay="0s" text="Team Player" type="h2"/>

            <FadeInComponent once={true} text="In college courses, I often worked in small teams of 2-4. I believe that I thrive in a team setting, 
            when I can bounce ideas off of other people and learn concepts from other developers." type="p" delay="0.5s"/>
        </div>
    )
}

function Projects(props){
    return(
        <div className="projects-content">
            <h1 id="projects">My Projects</h1>
            <div className="project-buttons">
                <ProjectButton destination="https://github.com/Alexander-Quatrini/Steam-App" title="Steam App (WIP)" src={angularLogo} id="project-one"/>
                <ProjectButton destination="https://github.com/Alexander-Quatrini/OnlineResume" title="Online Resume" src={reactLogo} id="project-two"/>
                {/*<ProjectButton destination="https://www.github.com" title="Sample Project 3" src="media/src1.jpeg" id="project-three"/>
                <ProjectButton destination="https://www.github.com" title="Sample Project 4" src="media/src1.jpeg" id="project-four"/>*/}
            </div>
        </div>
    )
}

function ProjectButton(props)
{
    let imageSource = props.src;
    return(
    <div className="project-preview-wrapper">
        <label className="project-preview" htmlFor={props.id}>{props.title}</label>
        <div onClick={() => window.open(props.destination, "_blank")} className="project-preview-image" style={{backgroundImage : "url("+imageSource+")"}}>
            <form action={props.destination}>
                <button id={props.id} type="submit">{props.title}</button>
            </form>
        </div>
    </div>
    )
}

function ContactMe(props)
{
    return(
        <div className="contact-content" id="contactme">
            <FadeInComponent destination="mailto:alexanderquatrini@gmail.com"once={true} delay="0s" text="alexanderquatrini@gmail.com" type="a"/>
            <FadeInComponent destination="https://www.linkedin.com/in/alexander-quatrini/" once={true} delay="0s" text="LinkedIn" type="a"/>
        </div>
    )
}

function Footer(props)
{
    return(
        <div className="footer-content">
            <p>Website Programmed by Alexander Quatrini</p>
        </div>
    )
}

function App(){
    return (
    <div className="webPage">
        <BackToTop text="back to top" desiredClassName="return-to-top"/>
        <Header/>
        <GradientImage height="15em"><h1>Hello. Welcome to my online resume.</h1></GradientImage>
        <GradientImage height="10em">
            <FadeInComponent once={false} text="Click a link to skip to a specific section, or keep scrolling down to continue." delay="0s" type="h1"/>
        </GradientImage>
        <GradientImage height="25em">
            <Intro/>
        </GradientImage>
        <GradientImage height="15em"><FadeInComponent once={true} text="Let's start with some background..." delay="0s" type="h1" id="aboutme"/></GradientImage>
        <AboutMe/>
        <GradientImage height="15em"><FadeInComponent once={true} delay="0s" text="What about practical skills?" type="h1" id="skills"/></GradientImage>
        <Skills/>
        <GradientImage height="15em"><FadeInComponent once={true} delay="0s" text="Any experience in the field?" type="h1" id="experience"/></GradientImage>
        <Experience/>
        <GradientImage height="15em"><FadeInComponent once={true} delay="0s" text="Three qualities I'm most proud of having..." type="h1" id="qualities"/></GradientImage>
        <Qualities/>
        <GradientImage height="15em"><FadeInComponent once={true} delay="0s" text="Let's see everything come together to form practical programs!" type="h1" id="projects"/></GradientImage>
        <Projects/>
        <GradientImage height="5em"><FadeInComponent once={true} delay="0s" text="Like what you see? Here's my info..." type="h1" id="contactme"/></GradientImage>
        <GradientImage height="15em"> <ContactMe/> </GradientImage>
        <Footer/>
    </div>
    );
}

export default App;