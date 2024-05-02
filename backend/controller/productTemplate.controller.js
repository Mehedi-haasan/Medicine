const ProductTemplate = require('../schema/productTemplate.schema')
const ProductVariant = require("../schema/productVariant.schema");
const ProductAttribute = require('../schema/productAttribute.schema')


exports.createProduct = async (req, res) => {
    const { title, description, image_url, category, price, standard_price, attribute } = req.body;
    try {

        let variant;
        if (attribute) {
            variant = await generateProductVariants(attribute);
        }

        await ProductTemplate.create({
            title: title,
            description: description,
            image_url: image_url,
            category: category,
            price: price,
            standard_price: standard_price,
        })



        const productTemplate = await ProductTemplate.findOne().sort({ _id: -1 }).select('id').exec();


        for (let i = 0; i < variant.length; i++) {
            let keys = Object.keys(variant[i]);
            let values = Object.values(variant[i])

            await ProductVariant.create({
                title: title,
                description: description,
                image_url: image_url,
                price: price,
                standard_price: standard_price,
                templateId: productTemplate.id,
                category: category,
            });


            const productVariant = await ProductVariant.findOne().sort({ _id: -1 }).select('id').exec();


            for (let j = 0; j < keys.length; j++) {
                await ProductAttribute.create({
                    variant_id: productVariant.id,
                    templete_id: productTemplate.id,
                    name: keys[j],
                    value: values[j]
                })
            }
        }

        res.status(200).send({
            success: true,
            message: "Product Create Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}


function generateProductVariants(attributes) {
    const variants = [];

    function generateVariantsHelper(index, currentVariant) {
        if (index === attributes.length) {
            variants.push({ ...currentVariant });
            return;
        }

        const currentAttribute = attributes[index];

        for (const value of currentAttribute.value) {
            currentVariant[currentAttribute.name] = value;
            generateVariantsHelper(index + 1, currentVariant);
        }
    }

    generateVariantsHelper(0, {});

    return variants;
}


exports.getProduct = async (req, res) => {
    try {
        let products = await ProductTemplate.find();

        res.status(200).send({
            success: true,
            items: products
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};



exports.getProductVariant = async (req, res) => {
    const { templateId } = req.body;
    try {
        const data = await ProductVariant.find({ templateId: templateId }).select('id name image_url price standard_price description category templateId').exec();

        let Variant = await Promise.all(data.map(async (da) => {
            let attr = await ProductAttribute.findOne({ variant_id: da._id }).select('name value');
            return {
                ...da._doc,
                attribute: attr,
            };
        }));
        
        

        const attribute = await ProductAttribute.find({ templete_id: templateId })
            .select('name value')
            .exec();

        const groupedData = attribute.reduce((acc, { name, value }) => {
            const existingAttribute = acc.find(attr => attr.name === name);
            if (existingAttribute) {
                if (!existingAttribute.value.includes(value)) {
                    existingAttribute.value.push(value);
                }
            } else {
                acc.push({ name, value: [value] });
            }
            return acc;
        }, []);

        res.status(200).send({
            success: true,
            attribute: groupedData,
            items: data
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};
