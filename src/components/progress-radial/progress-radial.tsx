import { Component, Prop, ComponentInterface } from '@stencil/core';

@Component({
    tag: 'wcs-progress-radial',
    styleUrl: 'progress-radial.scss',
    shadow: true
})
export class ProgressRadial implements ComponentInterface {
    @Prop() size = 120;
    @Prop() showLabel = false;
    @Prop() value = 0;

    render() {
        const { size, halfSize } = { size: this.size, halfSize: this.size / 2 };
        return (
            <div class= "progress-circle" data-component= "radial-progress">
                <svg class= "progress-circle-figure"
                    data-role= "figure"
                    width= {this.size}
                    height= {this.size}
                    viewBox= {`0 0 ${size} ${size}`}
                    style= {this.getSvgStyle()}
                >
                    <circle class= "progress-circle-meter" cx= {halfSize} cy= {halfSize} r= "54" stroke-width= "12" />
                    <circle class= "progress-circle-value" cx= {halfSize} cy= {halfSize} r= "54" stroke-width= "12" />
                </svg>
                {this.showLabel &&
                    <div class= "progress-circle-label" data-role= "label"><span><span data-role= "labelvalue">{this.value}</span><sup>%</sup></span></div>
                }
                <input data-role= "control" class= "sr-only" type= "range" value= {this.value} />
            </div>
        );
    }

    getSvgStyle() {
        return {
            'stroke-dasharray': 339.292,
            'stroke-dashoffset': 339.292 - (this.value / 100) * 339.292
        };
    }
}
