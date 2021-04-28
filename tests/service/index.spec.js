const request = require('supertest');
const expect = require('chai').expect;

describe('NODE JS API TEST', () => {
  it("getList is ok?", function() {
    request("http://localhost:3000")
      .get("/api/getDataList")
      .expect(200) 
      .end((err, res) => {
        // console.log(res.body.data);
        expect(res.body.data.length).equal(2);
        expect(res.body.data[0].name).equal('a');
      })   
  })
})