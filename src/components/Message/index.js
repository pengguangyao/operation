import React, { Component } from 'react';
import ReactDom from 'react-dom';
import style from './index.less'


class Msg extends Component {
    componentDidMount() {
        this.timer1 = setTimeout(() => {
            this.root.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        this.timer2 = setTimeout(() => {
            this.root.style.transform = 'translateX(-50%) translateY(-150px)';
        }, this.props.duration);

    }

    componentWillUnmount() {
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);
    }

    render() {
        let icon;
        switch (this.props.type) {
            case 'success':
                icon = 'success'
                break;
            case 'warning':
                icon = 'warning'
                break;
            case 'info':
                icon = 'info'
                break;
            case 'error':
                icon = 'error'
                break;
            case 'warn':
                icon = 'warn'
                break;
            case 'loading':
                icon = 'loading'
                break;
            default:
                icon = 'info'
                break;
        }
        return (
            <div ref={root => this.root = root} className={`${style.root} ${style[`root_${icon}`]}`}>
                <span className={style[icon]}></span>
                <p>{this.props.content}</p>
            </div>
        )
    }
}

Msg.defaultProps = {
    content: '...',
    duration: '2000',
    onClose: () => ({}),
}



const show = (props) => {
    let div = document.createElement('div');
    document.body.append(div);

    ReactDom.render(<Msg {...props} />, div);
    // setTimeout(() => {
    //     document.body.removeChild(div);
    // }, 3000);

}


const ModalBox = {};

ModalBox.success = (content, duration, onClose) => {
    return show({
        content,
        duration,
        onClose,
        type: 'success'
    })

}
ModalBox.error = (content, duration, onClose) => show({
    content,
    duration,
    onClose,
    type: 'error'
});
ModalBox.info = () => show({

    type: 'info'
});
ModalBox.warning = () => show({

    type: 'warning'
});
ModalBox.warn = () => show({

    type: 'warn'
});
ModalBox.loading = () => show({

    type: 'loading'
});


export default ModalBox;