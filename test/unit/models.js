const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../src/models');
const { salesModel } = require('../../src/models');

describe('Products Model', () => {
  const productMock = {
    _id: '64a1f5e2b3c4d56789abcdef',
    name: 'Danete',
    quantity: 10,
  };

  afterEach(() => sinon.restore());

  it('Schema e model do produto existem', () => {
    expect(productsModel.modelName).to.equal('products');
    const { paths } = productsModel.schema;
    expect(paths).to.have.property('name');
    expect(paths).to.have.property('quantity');
  });

  it('Criar um produto com sucesso', async () => {
    sinon.stub(productsModel, 'create').resolves(productMock);

    const result = await productsModel.create({ name: 'Danete', quantity: 10 });
    expect(result).to.deep.equal(productMock);
  });

  it('Listar todos os produtos', async () => {
    sinon.stub(productsModel, 'find').resolves([productMock]);

    const result = await productsModel.find();
    expect(result).to.deep.equal([productMock]);
  });

  it('Retornar um produto não existente', async () => {
    sinon.stub(productsModel, 'findOne').resolves(null);

    const result = await productsModel.findOne({ name: 'Danete' });
    expect(result).to.be.null;
  });

  it('Encontrar um produto pelo id', async () => {
    sinon.stub(productsModel, 'findById').resolves(productMock);

    const result = await productsModel.findById('64a1f5e2b3c4d56789abcdef');
    expect(result).to.deep.equal(productMock);
  });

  it('Atualizar um produto', async () => {
    const updatedProductMock = { ...productMock, quantity: 15 };
    sinon.stub(productsModel, 'findByIdAndUpdate').resolves(updatedProductMock);

    const result = await productsModel.findByIdAndUpdate(
      '64a1f5e2b3c4d56789abcdef',
      { quantity: 15 },
      { new: true },
    );
    expect(result).to.deep.equal(updatedProductMock);
  });

  it('Deletar um produto', async () => {
    sinon.stub(productsModel, 'findByIdAndDelete').resolves(productMock);

    const result = await productsModel.findByIdAndDelete(
      '64a1f5e2b3c4d56789abcdef',
    );
    expect(result).to.deep.equal(productMock);
  });
});

describe('Sales Model', () => {
  const salesMock = {
    _id: '64b2f5e2b3c4d56789abcdef',
    itensSold: [
      { productId: '64a1f5e2b3c4d56789abcdef', quantity: 2 },
      { productId: '64a1f5e2b3c4d56789abcdf', quantity: 5 },
    ],
  };

  afterEach(() => sinon.restore());

  it('Schema e model da venda existem', () => {
    expect(salesModel.modelName).to.equal('sales');
    const { paths } = salesModel.schema;
    expect(paths).to.have.property('itensSold');
  });

  it('Criar uma venda com sucesso', async () => {
    sinon.stub(salesModel, 'create').resolves(salesMock);

    const result = await salesModel.create({
      _id: '64b2f5e2b3c4d56789abcdef',
      itensSold: salesMock.itensSold,
    });
    expect(result).to.deep.equal(salesMock);
  });

  it('Listar todas as vendas', async () => {
    sinon.stub(salesModel, 'find').resolves([salesMock]);

    const result = await salesModel.find();
    expect(result).to.deep.equal([salesMock]);
  });

  it('Retornar uma venda não existente', async () => {
    sinon.stub(salesModel, 'findById').resolves(null);

    const result = await salesModel.findById('64b2f5e2b3c4d56789abcdef');
    expect(result).to.be.null;
  });

  it('Encontrar uma venda pelo id', async () => {
    sinon.stub(salesModel, 'findById').resolves(salesMock);

    const result = await salesModel.findById('64b2f5e2b3c4d56789abcdef');
    expect(result).to.deep.equal(salesMock);
  });

  it('Atualizar uma venda', async () => {
    const updatedSalesMock = {
      ...salesMock,
      itensSold: [
        { productId: '64a1f5e2b3c4d56789abcdef', quantity: 3 },
        { productId: '64a1f5e2b3c4d56789abcdf', quantity: 6 },
      ],
    };
    sinon.stub(salesModel, 'findByIdAndUpdate').resolves(updatedSalesMock);

    const result = await salesModel.findByIdAndUpdate(
      '64b2f5e2b3c4d56789abcdef',
      { itensSold: updatedSalesMock.itensSold },
      { new: true },
    );
    expect(result).to.deep.equal(updatedSalesMock);
  });

  it('Deletar uma venda', async () => {
    sinon.stub(salesModel, 'findByIdAndDelete').resolves(salesMock);

    const result = await salesModel.findByIdAndDelete(
      '64b2f5e2b3c4d56789abcdef',
    );
    expect(result).to.deep.equal(salesMock);
  });
});
