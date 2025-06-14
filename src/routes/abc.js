import React, {useState} from 'react'
import {useMutation} from 'react-query'
import classnames from 'classnames'

import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(() => ({
    danger: {
      color: 'red',
    },
    disabled: {
      color: '#8C8C8C !important',
    },
  }))
import {
  CircularProgress,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
} from '@material-ui/core'

import Modal from '@fci/ui/build/Modal'
import {handleError, showSuccess} from '../../../components/notification'

// styles


export default (props) => {
  const {
    onAction,
    vm,
    actionType,
    actionName,
    requireConfirmation,
    disabled,
    onDone,
    t,
  } = props

  const [open, setOpen] = useState(false)
  const {mutateAsync, isLoading} = useMutation('vms', onAction)

  const onSubmit = () => {
    setOpen(false)
    return mutateAsync()
      .then(() => {
        showSuccess({
          message: t('message.successfully_vm_action', {
            actionName: actionName.toLowerCase(),
            vmName: vm.name,
          }),
        })
      })
      .then(onDone)
      .catch((error) => {
        handleError(error)
      })
  }

  const classes = useStyles()
  const title = t('title.action_instance', {actionName})
  const submitButtonText = `${actionName}`




  const dialogContent = (
    <span>
      {(actionName === 'Reboot' || actionName === 'リブート') && (
        <>{t('warning_confirm.action_instance_confirm')} </>
      )}
      {t('warning_confirm.action_instance_confirm2', {
        actionName: actionName.toLowerCase(),
      })}
      <span style={{fontWeight: 600}}> [{vm.name}]</span>?
    </span>
  )
  const handleConfirmation = () => setOpen(true)

  return (
    <>
      <MenuItem
        onClick={requireConfirmation ? handleConfirmation : onSubmit}
        disabled={disabled || isLoading}
        className={classnames({
          [classes.disabled]: disabled || isLoading,
        })}
      >
        <ListItemText
          className={classnames({
            [classes.danger]: actionType === 'danger',
          })}
        >
          {actionName}
        </ListItemText>
        <ListItemSecondaryAction>
          {isLoading && <CircularProgress size={20} />}
        </ListItemSecondaryAction>
      </MenuItem>

      <Modal
        title={title}
        isOpen={open}
        onCancel={() => setOpen(false)}
        submitButtonText={submitButtonText}
        onSubmit={onSubmit}
      >
        {dialogContent}
      </Modal>
    </>
  )
}