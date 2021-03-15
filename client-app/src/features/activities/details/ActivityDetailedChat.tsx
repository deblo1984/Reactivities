import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
import { Segment, Header, Comment, Button } from 'semantic-ui-react'
import MyTextArea from '../../../app/common/form/MyTextArea'
import { useStore } from '../../../app/stores/store'
import { formatDistanceToNow } from 'date-fns/esm';

interface Props {
    activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
    const { commentStore } = useStore();

    useEffect(() => {
        if (activityId) {
            commentStore.createHubConnection(activityId);
        }
        return () => {
            commentStore.clearComments()
        }
    }, [commentStore, activityId])

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
                <Formik
                    onSubmit={(values, { resetForm }) =>
                        commentStore.addComment(values).then(() => resetForm())}
                    initialValues={{ body: '' }}

                    validationSchema={Yup.object({
                        body: Yup.string().required()
                    })}
                >
                    {({ isSubmitting, isValid }) => (
                        <Form className='ui form'>
                            <MyTextArea placeholder='Add Comment' name='body' rows={2} />
                            <Button
                                loading={isSubmitting}
                                disabled={isSubmitting || !isValid}
                                content='Add Reply'
                                labelPosition='left'
                                icon='edit'
                                primary
                                type='submit'
                                floated='right'
                            />
                        </Form>
                    )}

                </Formik>

                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                                    {comment.displayName}
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistanceToNow(comment.createdAt)}</div>
                                </Comment.Metadata>
                                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{comment.body}</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    ))}

                </Comment.Group>
            </Segment>
        </>

    )
})
