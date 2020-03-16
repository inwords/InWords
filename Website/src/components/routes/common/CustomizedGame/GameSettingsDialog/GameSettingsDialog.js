import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogActions from 'src/components/core/DialogActions';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import FormGroup from 'src/components/core/FormGroup';
import FormControlLabel from 'src/components/core/FormControlLabel';
import Typography from 'src/components/core/Typography';
import Slider from 'src/components/core/Slider';
import Checkbox from 'src/components/core/Checkbox';
import Button from 'src/components/core/Button';

import './GameSettingsDialog.css';

function GameSettingsDialog({
  open,
  handleClose,
  inputs,
  handleChange,
  handleSubmit
}) {
  return (
    <Dialog
      aria-labelledby="training-settings-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="training-settings-dialog">
        Настройки тренировки
      </DialogTitle>
      <DialogContent>
        <form
          id="training-settings-form"
          onSubmit={event => {
            handleSubmit(event);
            handleClose();
          }}
        >
          <FormGroup>
            <Typography component="p" variant="body2" gutterBottom>
              Максимум слов в тренировке
            </Typography>
            <Grid spacing={1} alignItems="center">
              <GridItem xs={10} sm={6}>
                <Slider
                  name="quantity"
                  min="2"
                  max="8"
                  value={inputs.quantity}
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem xs={2} sm={6}>
                <Typography variant="body1">{inputs.quantity}</Typography>
              </GridItem>
            </Grid>
          </FormGroup>
          <FormGroup>
            <Typography component="p" variant="body2" gutterBottom>
              Размер карточки
            </Typography>
            <Grid spacing={1} alignItems="center">
              <GridItem xs={10} sm={6}>
                <Slider
                  name="cardDimension"
                  min="80"
                  max="140"
                  step="5"
                  value={inputs.cardDimension}
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem xs={2} sm={6}>
                <Typography variant="body1">
                  {inputs.cardDimension}px
                </Typography>
              </GridItem>
            </Grid>
          </FormGroup>
          <FormGroup>
            <Typography component="p" variant="body2" gutterBottom>
              Размер текста на карточке
            </Typography>
            <Grid spacing={1} alignItems="center">
              <GridItem xs={10} sm={6}>
                <Slider
                  name="cardTextSize"
                  min="12"
                  max="24"
                  step="1"
                  value={inputs.cardTextSize}
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem xs={2} sm={6}>
                <Typography variant="body1">{inputs.cardTextSize}px</Typography>
              </GridItem>
            </Grid>
          </FormGroup>
          <div>
            <FormControlLabel>
              <Checkbox
                name="voiceOn"
                checked={inputs.voiceOn}
                onChange={handleChange}
                edge="start"
              />
              <Typography variant="body2">
                Озвучивать английские слова
              </Typography>
            </FormControlLabel>
          </div>
          <div>
            <FormControlLabel>
              <Checkbox
                name="listOn"
                checked={inputs.listOn}
                onChange={handleChange}
                edge="start"
              />
              <Typography variant="body2">
                Показывать слова перед тренировкой
              </Typography>
            </FormControlLabel>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Отменить
        </Button>
        <Button
          type="submit"
          form="training-settings-form"
          variant="text"
          color="primary"
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

GameSettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  inputs: PropTypes.shape({
    quantity: PropTypes.string,
    voiceOn: PropTypes.bool,
    listOn: PropTypes.bool,
    cardDimension: PropTypes.string,
    cardTextSize: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default GameSettingsDialog;
