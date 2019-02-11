import classNames from "classnames";
import * as React from "react";

interface ITableProps {
  children?: React.ReactNode;
  className?: string;
  bordered?: boolean;
  striped?: boolean;
  narrow?: boolean;
  hoverable?: boolean;
  fullwidth?: boolean;
}

class Table extends React.Component<ITableProps, any> {
  constructor(props: ITableProps) {
    super(props);
  }

  public render() {
    const classes = classNames(this.props.className, "table", {
      "is-bordered": this.props.bordered,
      "is-fullwidth": this.props.fullwidth,
      "is-hoverable": this.props.hoverable,
      "is-narrow": this.props.narrow,
      "is-striped": this.props.striped
    });

    return <table className={classes}>{this.props.children}</table>;
  }
}

export default Table;
