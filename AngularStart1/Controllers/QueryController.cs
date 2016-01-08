using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
//using Omg.CustomerSupport;

namespace AngularStart1.Controllers
{
    public class QueryController : ApiController
    {
        // GET api/query/5
        public TransactionQuery Get(int transactionId)
        {

            TransactionQuery query = new TransactionQuery();
            query.Description = "Spanner Monkey";
            query.Name = "Dave Chandalor";
            query.Telephone = "07734439905";
            query.Postcode = "NR1 4AR";
            query.DOB = DateTime.Parse("03/06/2015");
            

     // query = Omg.CustomerSupport.TransactionGateway.Instance.GetByTransactionID("en", transactionId);..

            return  query;
        }  

        public IEnumerable<TransactionQuery> Get(string name)
        {

            //    List<TransactionQuery> queries = (List<TransactionQuery>)Omg.CustomerSupport.TransactionGateway.Instance.GetByParametersAffiliate(2622, "", "", "", "", null, null);
            List<TransactionQuery> queries = new List<TransactionQuery>();
            return queries;
        }

     
        // POST api/query
        public void Post([FromBody]string value)
        {
        }

        // PUT api/query/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/query/5
        public void Delete(int id)
        {
        }
    }

    public class TransactionQuery
    {
        private String description;
        private String name;
        private String telephone;
        private String postcode;
        private DateTime dob;
    public string Description
            {
                get
                {
                    return description;
                }

                set
                {
                    description = value;
                }
            }
        

    public string Name
    {
        get
        {
            return name;
        }
        set
            {
                name = value;
            }
    }

    public string Telephone
        {
            get
            {
                return telephone;
            }
            set
            {
                telephone = value;
            }
        }

    public string Postcode
        {
            get
            {
                return postcode;
            }
            set
            {
                postcode = value;
            }
        }

        public DateTime DOB
        {
            get
            {
                return dob;
            }
            set
            {
                dob = value;
            }
        }



    }
}
