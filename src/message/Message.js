function Messege(props) {

    if (props.sender == "me") {
        return (

            <li id="first-message-example" className="clearfix">
                <img src="pictures\naor-nahman-profile.jpg" className="rounded-circle profile-pic-in-div" />
                <div className="card text-white bg-primary mb-3" style={{ maxWidth: '18rem', left: '10%' }}>
                    <div className="card-body">
                        <p className="card-text">{props.messegeTest}</p>
                    </div>
                </div>
            </li>
        );
    }
    else {
        return (
            <li>
                <img src="pictures\or-haroni-profile.jpg" className="rounded-circle sender-pic-in-div" />
                <div className="card text-white bg-secondary mb-3" style={{ maxWidth: '18rem', float: 'right', right: '10%' }}>
                    <div className="card-body">
                        <h5 className="card-title">{props.sender}</h5>
                        <p className="card-text">{props.messegeTest}</p>
                    </div>
                </div>
            </li>
        )
    }
}
export default Messege;