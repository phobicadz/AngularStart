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

      //      query = Omg.CustomerSupport.TransactionGateway.Instance.GetByTransactionID("en", transactionId);

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
    { }
}
