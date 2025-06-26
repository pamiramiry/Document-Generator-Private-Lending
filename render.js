const { Liquid } = require('liquidjs');
const fs = require('fs');
const engine = new Liquid();

const template = `
  <h1>Loan Agreement</h1>
  <!-- Basic loan summary line with lender, amount, and borrower -->
  <p>{{lender}} agrees to give a loan of {{amount}} to {{borrower}}under the following requirments</p>
  <!-- Show different content based on whether it's a short or long term loan -->
  {% if Term == 1 %}
    <p>This is a short term loan.</p>
  {% else %}
    <p> This is a long term loan so the interest is going to increase per year</p>
    <table style="border: 1px solid black;">
        <tr>
            <th>Year</th>
            <th>Interest per month</th>
        </tr>
        <!-- Loop through each year of the term -->
        {% for i in (1..Term) %}
            <tr>
                <td style="border: 1px solid #000; padding: 8px;">Year {{ i }}</td>
                <!-- Multiply base rate by year to simulate yearly increase -->
                <td style="border: 1px solid #000; padding: 8px;">{{ Term | times: i}}%</td>
            </tr>
        {% endfor %}
    </table>
    {% endif %}
    <!-- Terms and conditions related to how the loan can be used -->
    <p>This loan is supposed to be only used for Marketing</p>
    <p>Payments are to be made monthly</p>
    <p>Receipts of any loan spending needs to be provided every month</p>
    <p>If User defaults on his payment a fee of %{fee} will be charged</p>
    <p>Failure to compny gives us a right to revoke the loan</p>
    <p>If {{borrower}} can not pay then {{lender}} takes an equivalent percent in the business as collateral</p>

    <tr>
        <th>Signature of {{borrower}}</th>
        <th style>Signature of {{lender}}</th>
    </tr>
   
  `
// Sample data to populate the template with
const data = {
    lender: "Pamir Co.",
    borrower: "Booms Co",
    amount: "$100,000",
    interestRate: 1,
    fee:100,
    Term: 4
  };

  // Render the Liquid template with the provided data and write the result to an HTML file
  engine.parseAndRender(template, data).then(result => {
    fs.writeFileSync("output.html", result); // Save as HTML file
    console.log("✅ output.html created with rendered content.");
  });
  