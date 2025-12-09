const sinon = require('sinon');
const { expect } = require('chai');

const { productsController, salesController } = require('../../src/controllers');
const { productsService, salesService } = require('../../src/services');
const statusHTTP = require('../../src/utils/statusHTTP');

describe('Testes da camada Controller - Products', () => {
  let req; let
    res;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
  });

  afterEach(() => sinon.restore());

  it('Salva um produto com sucesso', async () => {
    req.body = { name: 'teclado', quantity: 5 };

    sinon.stub(productsService, 'saveProducts').resolves({
      _id: '123',
      name: 'teclado',
      quantity: 5,
    });

    await productsController.saveProducts(req, res);

    expect(res.status.calledWith(statusHTTP('CREATED'))).to.be.true;
    expect(
      res.json.calledWith({
        _id: '123',
        name: 'teclado',
        quantity: 5,
      }),
    ).to.be.true;
  });

  it('Retorna erro quando produto já existe', async () => {
    req.body = { name: 'mouse', quantity: 10 };

    const error = new Error('Product already exists');

    sinon.stub(productsService, 'saveProducts').throws(error);

    await productsController.saveProducts(req, res);

    expect(res.status.calledWith(statusHTTP('INVALID_DATA'))).to.be.true;
    expect(
      res.json.calledWith({
        err: { message: 'Product already exists', code: 'invalid_data' },
      }),
    ).to.be.true;
  });

  it('Retorna todos os produtos', async () => {
    sinon.stub(productsService, 'getAll').resolves({
      data: [
        { _id: '1', name: 'teclado', quantity: 5 },
        { _id: '2', name: 'mouse', quantity: 10 },
      ],
    });

    await productsController.getAll(req, res);

    expect(res.status.calledWith(statusHTTP('SUCCESS'))).to.be.true;
    expect(
      res.json.calledWith({
        products: [
          { _id: '1', name: 'teclado', quantity: 5 },
          { _id: '2', name: 'mouse', quantity: 10 },
        ],
      }),
    ).to.be.true;
  });

  it('Retorna um produto por ID', async () => {
    req.params = { id: '123' };

    sinon.stub(productsService, 'getById').resolves({
      data: { _id: '123', name: 'fone', quantity: 3 },
    });

    await productsController.getById(req, res);

    expect(res.status.calledWith(statusHTTP('SUCCESS'))).to.be.true;
    expect(res.json.calledWith({ _id: '123', name: 'fone', quantity: 3 })).to.be
      .true;

    it('Retorna erro para ID inválido', async () => {
      req.params = { id: 'abc' };

      sinon
        .stub(productsService, 'getById')
        .throws(new Error('Wrong id format'));

      await productsController.getById(req, res);

      expect(res.status.calledWith(statusHTTP('INVALID_DATA'))).to.be.true;
      expect(
        res.json.calledWith({
          err: { code: 'invalid_data', message: 'Wrong id format' },
        }),
      ).to.be.true;
    });
  });

  it('Atualiza um produto com sucesso', async () => {
    req.params = { id: '999' };
    req.body = { name: 'novo nome', quantity: 7 };

    sinon.stub(productsService, 'updateProduct').resolves({
      status: 'SUCCESS',
      data: { _id: '999', name: 'novo nome', quantity: 7 },
    });

    await productsController.updateProduct(req, res);

    expect(res.status.calledWith(statusHTTP('SUCCESS'))).to.be.true;
    expect(
      res.json.calledWith({
        _id: '999',
        name: 'novo nome',
        quantity: 7,
      }),
    ).to.be.true;

    it('Retorna erro ao atualizar', async () => {
      req.params = { id: '999' };
      req.body = { name: 'novo nome', quantity: 7 };

      sinon
        .stub(productsService, 'updateProduct')
        .throws(new Error('Invalid data'));

      await productsController.updateProduct(req, res);

      expect(res.status.calledWith(statusHTTP('INVALID_DATA'))).to.be.true;
      expect(
        res.json.calledWith({
          err: { code: 'invalid_data', message: 'Invalid data' },
        }),
      ).to.be.true;
    });
  });

  it('Deleta um produto com sucesso', async () => {
    req.params = { id: '999' };

    sinon
      .stub(productsService, 'deleteProduct')
      .resolves({ message: 'Product deleted' });

    await productsController.deleteProduct(req, res);

    expect(res.status.calledWith(statusHTTP('SUCCESS'))).to.be.true;
    expect(res.json.calledWith('Product deleted')).to.be.true;

    it('Retorna erro ao deletar', async () => {
      req.params = { id: 'xxx' };

      sinon
        .stub(productsService, 'deleteProduct')
        .throws(new Error('Wrong id format'));

      await productsController.deleteProduct(req, res);

      expect(res.status.calledWith(statusHTTP('INVALID_DATA'))).to.be.true;
      expect(
        res.json.calledWith({
          err: { code: 'invalid_data', message: 'Wrong id format' },
        }),
      ).to.be.true;
    });
  });
});

describe('Testes da camada Controller - Sales', () => {
  let req; let
    res;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
      end: sinon.stub().returns(),
    };
  });

  afterEach(() => sinon.restore());

  const saleMock = {
    _id: '64b2f5e2b3c4d56789abcdef',
    itensSold: [{ productId: '64a1f5e2b3c4d56789abcdef', quantity: 2 }],
  };

  it('Salva uma venda com sucesso', async () => {
    req.body = saleMock.itensSold;

    sinon.stub(salesService, 'saveSales').resolves(saleMock);

    await salesController.saveSales(req, res);

    expect(res.status.calledWith(statusHTTP('SUCCESS'))).to.be.true;
    expect(res.json.calledWith(saleMock)).to.be.true;
  });

  it('Retorna erro ao salvar uma venda', async () => {
    req.body = saleMock.itensSold;

    sinon.stub(salesService, 'saveSales').throws(new Error('Invalid data'));

    await salesController.saveSales(req, res);

    expect(res.status.calledWith(statusHTTP('INVALID_DATA'))).to.be.true;
    expect(
      res.json.calledWith({
        err: { code: 'invalid_data', message: 'Invalid data' },
      }),
    ).to.be.true;
  });

  it('Retorna todas as vendas', async () => {
    sinon.stub(salesService, 'getAllSales').resolves({
      status: 'SUCCESSFUL',
      data: [saleMock],
    });

    await salesController.getAllSales(req, res);

    expect(res.status.calledWith(statusHTTP('SUCCESS'))).to.be.true;
    expect(res.json.calledWith({ sales: [saleMock] })).to.be.true;
  });

  it('Retorna uma venda por ID', async () => {
    req.params = { id: saleMock._id };

    sinon.stub(salesService, 'getSalesById').resolves({
      status: 'SUCCESS',
      data: saleMock,
    });

    await salesController.getSalesById(req, res);

    expect(res.status.calledWith(statusHTTP('SUCCESS'))).to.be.true;
    expect(res.json.calledWith(saleMock)).to.be.true;
  });

  it('Retorna erro se venda não existir', async () => {
    req.params = { id: saleMock._id };

    sinon
      .stub(salesService, 'getSalesById')
      .throws(Object.assign(new Error('Sale not found'), { status: 404 }));

    await salesController.getSalesById(req, res);

    expect(res.status.calledWith(statusHTTP('NOT_FOUND'))).to.be.true;
    expect(
      res.json.calledWith({
        err: { code: 'not_found', message: 'Sale not found' },
      }),
    ).to.be.true;
  });

  it('Atualiza uma venda com sucesso', async () => {
    req.params = { id: saleMock._id };
    req.body = saleMock.itensSold;

    sinon.stub(salesService, 'updateSale').resolves({
      status: 'SUCCESS',
      data: saleMock,
    });

    await salesController.updateSale(req, res);

    expect(res.status.calledWith(statusHTTP('SUCCESS'))).to.be.true;
    expect(res.json.calledWith(saleMock)).to.be.true;
  });

  it('Retorna erro ao atualizar venda', async () => {
    req.params = { id: saleMock._id };
    req.body = saleMock.itensSold;

    sinon.stub(salesService, 'updateSale').throws(new Error('Invalid data'));

    await salesController.updateSale(req, res);

    expect(res.status.calledWith(statusHTTP('INVALID_DATA'))).to.be.true;
    expect(
      res.json.calledWith({
        err: { code: 'invalid_data', message: 'Invalid data' },
      }),
    ).to.be.true;
  });

  it('Deleta uma venda com sucesso', async () => {
    req.params = { id: saleMock._id };

    sinon.stub(salesService, 'deleteSale').resolves();

    await salesController.deleteSale(req, res);

    expect(res.status.calledWith(statusHTTP('SUCCESS'))).to.be.true;
    expect(res.end.calledOnce).to.be.true;
  });

  it('Retorna erro ao deletar venda', async () => {
    req.params = { id: saleMock._id };

    sinon
      .stub(salesService, 'deleteSale')
      .throws(new Error('Wrong sale ID format'));

    await salesController.deleteSale(req, res);

    expect(res.status.calledWith(statusHTTP('INVALID_DATA'))).to.be.true;
    expect(
      res.json.calledWith({
        err: { code: 'invalid_data', message: 'Wrong sale ID format' },
      }),
    ).to.be.true;
  });
});
