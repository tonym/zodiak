import { Component, h, Prop, State, Watch } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;
  @Prop() fullname: string;
  @State() fullName: { first: string; middle?: string; last: string } = { first: '', last: '' };

  @Watch('fullname')
  watchFullname(newValue: string): void {
    if (newValue) {
      this.fullName = typeof newValue === 'object' ? newValue : JSON.parse(newValue);
    }
  }

  componentWillLoad(): void {
    this.watchFullname(this.fullname);
  }

  private getText(): string {
    return format(this.fullName.first, this.fullName.middle, this.fullName.last);
  }

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
