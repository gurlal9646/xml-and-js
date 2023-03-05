<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<head>
<title>Retail Stores</title>
<style>
          table {
            border-collapse: collapse;
          }
          th, td {
            text-align: center;
            padding: 6px;
            border: 2px solid #adc0ed;
          }
          th {
            background-color: #adc0ed;
            color: black;
          }
          tr:nth-child(odd) {
            background-color: #f2f2f2;
          }
        </style>
</head>
<body>
<table>
<tr>
<th>Store Id</th>
<th>Street</th>
<th>City</th>
<th>Region</th>
<th>Country</th>
<th>Employees</th>
<th>Products</th>
</tr>
<xsl:apply-templates select="stores/store"/>
</table>
</body>
</html>
</xsl:template>

<xsl:template match="store">
<tr>
<td><xsl:value-of select="@id"/></td>
<td><xsl:value-of select="address/street"/></td>
<td><xsl:value-of select="address/city"/></td>
<td><xsl:value-of select="address/region"/></td>
<td><xsl:value-of select="address/country"/></td>
<td>
<xsl:apply-templates select="employees"/>
</td>
<td>
<xsl:apply-templates select="products"/>
</td>
</tr>
</xsl:template>
<xsl:template match="employees">

 <table border="1">
                  <tr> 
                    <th>Id</th> 
                    <th>FirstName</th>
                    <th>LastName</th> 
                    <th>Position</th>
                    <th>Type</th>

                  </tr>                 
                  <xsl:for-each select="employee"> 
                    <tr>
                     <td><xsl:value-of select="empid"/></td>
                      <td><xsl:value-of select="firstName"/></td>
                      <td><xsl:value-of select="lastName"/></td>
                      <td><xsl:value-of select="position"/></td>
                      <td><xsl:value-of select="empType"/></td>
                    </tr>
                  </xsl:for-each> 
  </table>

</xsl:template>

<xsl:template match="products">

 <table>
                  <tr> 
                    <th>Id</th> 
                    <th>Name</th>
                    <th>Quantity</th> 
                    <th>USD Price</th>
                    <th>EURO Price</th>
                     <th>POUND Price</th>

                  </tr>                 
                  <xsl:for-each select="product"> 
                    <tr>
                     <td><xsl:value-of select="productid"/></td>
                      <td><xsl:value-of select="name"/></td>
                      <td><xsl:value-of select="qty"/></td>
                      <td><xsl:value-of select="usdPrice"/></td>
                      <td><xsl:value-of select="euroPrice"/></td>
                       <td><xsl:value-of select="poundPrice"/></td>
                    </tr>
                  </xsl:for-each> 
  </table>

</xsl:template>


</xsl:stylesheet>