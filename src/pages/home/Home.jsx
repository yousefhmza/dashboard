import "./home.scss";
import Widget from "../../components/molecules/widget/Widget";
import Featured from "../../components/organisms/featured/Featured";
import Chart from "../../components/organisms/chart/Chart";
import Table from "../../components/organisms/table/Table";

const Home = () => {
  return (
    <>
      <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>
      <div className="charts">
        <Featured />
        <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
      </div>
      <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        <Table />
      </div>
    </>
  );
};

export default Home;
