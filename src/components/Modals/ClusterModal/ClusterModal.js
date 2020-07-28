import React, { useEffect } from "react";
import Comment from "components/Modals/CardModal/Comment/Comment.js";
import styles from 'components/Modals/ClusterModal/ClusterModal.module.scss';
import { getColumnDemographics } from "data/helpers.js"
import * as d3 from "d3";

const ClusterModal = (props) =>  {
  const {setShowClusterModal, column} = props;

  useEffect(() => {
    createPie(columnDemographics.gender, "genderPie");
    createPie(columnDemographics.age, "agePie");
  });

  // Helper fxn to create the pie charts
  const createPie = (data, id) => {
    let width = 110;
    let height = 110;
    let margin = 10;

    let radius = Math.min(width, height) / 2 - margin;

    let svg = d3.select("#" + id)
                  .attr("width", width)
                  .attr("height", height)
                .append("g")
                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // set the color scale
    let color = d3.scaleOrdinal()
                  .domain(data)
                  .range(["#29509D", "#FFD4C8", "#C8D2E6", "#FF6635", "#E9EDF5"])

    // Compute the position of each group on the pie:
    let pie = d3.pie()
                .value(function(d) {return d.value; })
    let data_ready = pie(d3.entries(data))

    let arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg.selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('fill', function(d){ return(color(d.data.key)) })
        .transition().delay(function(d,i) {
          return i * 500; }).duration(500)
                            .attrTween('d', function(d) {
                              var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                              return function(t) {
                                d.endAngle = i(t); 
                                return arc(d)
                              }
                            })
        .style("opacity", 0.7)
  }

  // Helper fxn to count number of unique participants
  const numUnique = (items) => {
    let set = new Set();
    for (let item of items) {
      if (set.has(item.participant)) {continue;}
      set.add(item.participant);
    }
    return set.size;
  }
  
  const columnDemographics = getColumnDemographics(column);

  return (
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          {/* HEADER */}
          <div className={styles.header}>
            <div className={styles.header__title}>{column.text}</div>
            <div className={styles.header__buffer}></div>
            <div className={styles.header__lastEditedBy}>{"Last edited by " + column.items[0].createdBy.firstName + " " + column.items[0].createdBy.lastName} </div>
            <svg className={styles.header__closeButton} onClick={() => setShowClusterModal(false)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M19 6.4L17.6 5L12 10.6L6.4 5L5 6.4L10.6 12L5 17.6L6.4 19L12 13.4L17.6 19L19 17.6L13.4 12L19 6.4Z" fill="black" fillOpacity="1"/>
            </svg>
          </div>

          {/* UNIQUE PARTICIPANTS */}
          <div className={styles.uniqueParticipants}>
            <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5556 7.57895C11.5556 9.55555 9.96368 11.1579 8 11.1579C6.03632 11.1579 4.44444 9.55555 4.44444 7.57895C4.44444 5.60235 6.03632 4 8 4C9.96368 4 11.5556 5.60235 11.5556 7.57895Z" fill="#868E96"/>
              <path d="M4.496e-06 20.1052C1.9394e-05 17.1404 2.38783 14.7368 5.33333 14.7368L10.6667 14.7368C13.6122 14.7368 16 17.1404 16 20.1053V21H0L4.496e-06 20.1052Z" fill="#868E96"/>
            </svg>
            <div className={styles.uniqueParticipants__label}>{numUnique(column.items) + " unique participants"}</div>
          </div>

          {/* FIRST ROW */}
          <div className={styles.row}>
            <div className={styles.block}>
              <div className={styles.block__title}>Gender</div>
              <div className={styles.divider}></div>
              <div className={styles.pieRow}>
                <svg id = "genderPie"/>
                <div>
                  {Object.keys(columnDemographics["gender"]).map((key, index) => {
                    return (
                      <div key={index} className={styles.line}>
                        <div className={styles.line__labelSmall}>{key}</div>
                        {columnDemographics["gender"][key] + "%"}
                      </div>   
                    );
                  })}   
                </div>
              </div>   
            </div>
            <div className={styles.block}>
            <div className={styles.block__title}>Age</div>
              <div className={styles.divider}></div>   
              <div className={styles.pieRow}>
                <svg id="agePie"/>
                <div>
                  {Object.keys(columnDemographics["age"]).map((key, index) => {
                    return (
                      <div key={index} className={styles.line}>
                        <div className={styles.line__labelSmall}>{key}</div>
                        {columnDemographics["age"][key] + "%"}
                      </div>   
                    );
                  })}   
                </div>
              </div>   
            </div>
          </div>

          {/* SECOND ROW */}
          <div className={styles.row}>
            <div className={styles.block}>
              <div className={styles.block__title}>Occupation</div>
              <div className={styles.divider}></div>
              {Object.keys(columnDemographics["occupation"]).map((key, index) => {
                return (
                  <div key={index} className={styles.line}>
                    <div className={styles.line__label}>{key}</div>
                    {columnDemographics["occupation"][key]}
                  </div>   
                );
              })}
            </div>
            <div className={styles.block}>
              <div className={styles.block__title}>Organization Size</div>
              <div className={styles.divider}></div>
              {Object.keys(columnDemographics["companySize"]).map((key, index) => {
                return (
                  <div key={index} className={styles.line}>
                    <div className={styles.line__label}>{key}</div>
                    {columnDemographics["companySize"][key] + "%"}
                  </div>   
                );
              })}   
            </div>
          </div>

          <div className={styles.divider}></div>   

          {/* COMMENTS */}
          <div className={styles.row}>
            <div className={styles.row__label}>
              Comments
            </div>
            <div className={styles.comments}>
              <div className={styles.comments__input}>
                <input type="text" placeholder="Add a comment"></input>
                <div>Post</div>
              </div>
                {column.comments.length > 0 && column.comments.map((comment, index) => {
                  return (
                    <Comment key={index} member={comment.member} text={comment.text} date={comment.date}/>
                  )
                })}
            </div>
          </div>

        </div>
      </div>
  );
}

export default ClusterModal;
