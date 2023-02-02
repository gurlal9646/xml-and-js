<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">   
    <xsl:template match="/"> 

    <html>
         <body>
            <h1>Products List</h1>
            <!-- Table1 -->
            <table border="1">
                <tr bgcolor="#9acd32">
                    <td>Product Name</td>
                    <td>Manufacturer Id</td>
                    <td>Description</td>
                    <td>USD Price</td>
                </tr>
            
                <xsl:for-each select="products/product[@shippable='true']"> 
                <tr>
                    <td><xsl:value-of select="productName"/></td>
                    <td><xsl:value-of select="manufacturer/@id"/></td>
                    <td><xsl:value-of select="description"/></td>
                    <td><xsl:value-of select="prices/price[1]"/></td>
                </tr>
            </xsl:for-each>
            </table>

            <!-- Table2 -->
            <table border="1">
                <tr bgcolor="#9acd32">
                    <td>Product Name</td>
                    <td>Description</td>
                    <td>USD Price</td>
                    <td>Euro Price</td>
                </tr>
            
                <xsl:for-each select="products/product/manufacturer[@id='acme']/.."> 
                <tr>
                    <td><xsl:value-of select="productName"/></td>
                    <td><xsl:value-of select="description"/></td>
                    <td><xsl:value-of select="prices/price[1]"/></td>
                    <td><xsl:value-of select="prices/price[3]"/></td>
                </tr>
            </xsl:for-each>
            </table>

        </body>
    </html>
    </xsl:template>
</xsl:stylesheet>