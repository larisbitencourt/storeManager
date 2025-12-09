const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const { productsModel, salesModel } = require('../../src/models');
const { salesService } = require('../../src/services');
const {
  saveProducts,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
} = require('../../src/services/productsService');

const {
  saveSales,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSale,
} = require('../../src/services/salesService');

describe('Testes da camada services - Products', () => {
  const productMock = {
    _id: '64a1f5e2b3c4d56789abcdef',
    name: 'Danete',
    quantity: 10,
  };

  afterEach(() => {
    sinon.restore();
  });

  it('Cadastrar um produto com sucesso', async () => {
    sinon.stub(productsModel, 'findOne').resolves(null);
    sinon.stub(productsModel, 'create').resolves(productMock);

    const result = await saveProducts({ name: 'Danete', quantity: 10 });
    expect(result).to.deep.equal(productMock);
  });

  it('Conferir se um produto já existe', async () => {
    sinon.stub(productsModel, 'findOne').resolves(productMock);

    try {
      await saveProducts({ name: 'Danete', quantity: 10 });
    } catch (err) {
      expect(err.message).to.equal('Product already exists');
    }
  });

  it('Listar todos os produtos com sucesso', async () => {
    sinon.stub(productsModel, 'find').resolves([productMock]);

    const result = await getAll();
    expect(result.data).to.deep.equal([productMock]);
  });

  it('Listar um produto pelo id', async () => {
    sinon.stub(productsModel, 'findById').resolves(productMock);

    const result = await getById('64a1f5e2b3c4d56789abcdef');
    expect(result.data).to.deep.equal(productMock);
  });

  it('Retornar INVALID_DATA se o produto não for encontrado pelo id', async () => {
    sinon.stub(productsModel, 'findById').resolves(null);

    const result = await getById('64a1f5e2b3c4d56789abcdef');
    expect(result.status).to.equal('INVALID_DATA');
  });

  it('Atualizar um produto com sucesso', async () => {
    sinon.stub(productsModel, 'findByIdAndUpdate').resolves(productMock);

    const result = await updateProduct('64a1f5e2b3c4d56789abcdef', {
      name: 'Danete',
      quantity: 15,
    });
    expect(result.data).to.deep.equal(productMock);
  });

  it("Retornar 'Produto não encontrado' ao tentar atualizá-lo", async () => {
    sinon.stub(productsModel, 'findByIdAndUpdate').resolves(null);

    try {
      await updateProduct('64a1f5e2b3c4d56789abcdef', {
        name: 'Danete',
        quantity: 15,
      });
    } catch (err) {
      expect(err.message).to.equal('Produto não encontrado');
    }
  });

  it('Deletar um produto com sucesso', async () => {
    sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(true);
    sinon.stub(productsModel, 'findByIdAndDelete').resolves(productMock);

    const result = await deleteProduct('64a1f5e2b3c4d56789abcdef');
    expect(result.message).to.equal('Product deleted');
  });

  it('Deletar um produto com id inválido', async () => {
    sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(false);

    try {
      await deleteProduct('123');
    } catch (err) {
      expect(err.message).to.equal('Wrong id format');
    }
  });

  it('Deletar um produto que não existe', async () => {
    sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(true);
    sinon.stub(productsModel, 'findByIdAndDelete').resolves(null);

    try {
      await deleteProduct('64a1f5e2b3c4d56789abcdef');
    } catch (err) {
      expect(err.message).to.equal('Product not exists');
    }
  });
});

describe('Testes da camada services - Sales', () => {
  const salesMock = {
    _id: '64b2f5e2b3c4d56789abcdef',
    itensSold: [
      { productId: '64a1f5e2b3c4d56789abcdef', quantity: 2 },
      { productId: '64a1f5e2b3c4d56789abcdf', quantity: 5 },
    ],
  };

  const productMock = {
    _id: '64a1f5e2b3c4d56789abcdef',
    name: 'Danete',
    quantity: 10,
  };

  afterEach(() => {
    sinon.restore();
  });

  it('Cadastrar uma venda com sucesso', async () => {
    sinon.stub(productsModel, 'findById').resolves(productMock);
    sinon.stub(salesModel, 'create').resolves(salesMock);

    const itens = [{ productId: productMock._id, quantity: 2 }];

    const result = await saveSales(itens);
    expect(result).to.deep.equal(salesMock);
  });

  it('Listar todas as vendas com sucesso', async () => {
    sinon.stub(salesModel, 'find').resolves([salesMock]);

    const result = await getAllSales();
    expect(result.data).to.deep.equal([salesMock]);
  });

  it('Listar uma venda pelo id', async () => {
    sinon.stub(salesModel, 'findById').resolves(salesMock);

    const result = await getSalesById('64b2f5e2b3c4d56789abcdef');
    expect(result.data).to.deep.equal(salesMock);
  });

  it('Retornar erro quando a venda não for encontrada', async () => {
    sinon.stub(salesModel, 'findById').resolves(null);

    try {
      await getSalesById('64b2f5e2b3c4d56789abcdef');
    } catch (err) {
      expect(err.message).to.equal('Sale not found');
    }
  });

  it('Atualizar uma venda com sucesso', async () => {
    const saleId = '64a1f5e2b3c4d56789abcdf';

    const saleFromDb = {
      _id: saleId,
      itensSold: [{ productId: '111111111111111111111111', quantity: 2 }],
    };

    const updatedItensSold = [
      { productId: '111111111111111111111111', quantity: 3 },
    ];

    sinon.stub(salesModel, 'findById').resolves(saleFromDb);

    sinon
      .stub(productsModel, 'findById')
      .resolves({ _id: '111...', quantity: 10 });

    sinon.stub(productsModel, 'findByIdAndUpdate').resolves();

    sinon.stub(salesModel, 'findByIdAndUpdate').resolves({
      _id: saleId,
      itensSold: updatedItensSold,
    });

    const result = await salesService.updateSale(saleId, updatedItensSold);

    expect(result.status).to.equal('SUCCESS');
    expect(result.data.itensSold[0].quantity).to.equal(3);

    sinon.restore();
  });

  it('Retornar erro ao tentar atualizar venda inexistente', async () => {
    sinon.stub(salesModel, 'findById').resolves(null);

    try {
      await updateSale('64b2f5e2b3c4d56789abcdef', []);
    } catch (err) {
      expect(err.message).to.equal('Produto não encontrado');
    }
  });

  it('Deletar uma venda com sucesso', async () => {
    sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(true);
    sinon.stub(salesModel, 'findById').resolves(salesMock);
    sinon.stub(salesModel, 'findByIdAndDelete').resolves(salesMock);
    sinon.stub(productsModel, 'updateOne').resolves();

    const result = await deleteSale('64b2f5e2b3c4d56789abcdef');
    expect(result).to.equal(undefined);
  });

  it('Deletar uma venda com id inválido', async () => {
    sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(false);

    try {
      await deleteSale('123');
    } catch (err) {
      expect(err.message).to.equal('Wrong sale ID format');
    }
  });

  it('Erro ao deletar venda inexistente', async () => {
    sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(true);
    sinon.stub(salesModel, 'findById').resolves(null);

    try {
      await deleteSale('64b2f5e2b3c4d56789abcdef');
    } catch (err) {
      expect(err.message).to.equal('Sale not found');
    }
  });
});
